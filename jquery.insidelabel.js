/*
 * Inside Label jQuery Plugin
 * Idael Software
 * Copyright (c) 2009 David Jeanmonod
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://docs.jquery.com/License
 *
 * @version 0.1
 *
 *
 *   
 * This plugin allow to display the label of an input or an textarea inside the field.
 * To use it, activate it on the label:
 *   $('#labelId').inFieldLabel()
 *     
 * Then the label and the input are going to be encaplusated inside a relatif span in order
 * to use abosolute positioning inside:
 *   <span class="infieldlabel" style="position: relative">
 *     <label ... >
 *     <input ... >   
 *   </span>
 *    
 * For styling, here are the different class avaliable:
 *   span.inside-label-container : The encaplusated span
 *   input.with-label-inside     : Field that have the label inside
 *   label.inside                : Label that are inside a field  
 *   label.value-set             : Label of a field where the value isn't empty
 *   label.focus                 : Label of a field that have the focus
 *   label.inside.for-input      : Label that belong to an input (text or password)
 *   label.inside.for-textarea   : Label that belong to a textarea
 */
(function($){

  $.fn.insideLabel = function(options){
    return this.each(function(){
    
      var $thislabel = $(this);
    
      // Find input or textarea based on for= attribute
      var for_attr = $thislabel.attr('for'); 
      if( !for_attr ) return; // Nothing to attach, since the for field wasn't used
      
      // Only create object for input[text], input[password], or textarea
      var $field = $(
      "input#" + for_attr + "[type='text']," + 
        "input#" + for_attr + "[type='password']," + 
        "textarea#" + for_attr
      );
      
      // Again, nothing to attach
      if( $field.length == 0) return; 
      
      // $field found, now place it inside a relative span and add it a styling class
      $field.wrap('<span class="inside-label-container" style="position: relative; display:inline-block; width: 100%"></span>');
      $newSpan = $field.closest('span');
      $field.addClass('with-label-inside');
      
      // Move the label inside the same span, with position abs(0,0), and add it a class for styling
      $newSpan.prepend($thislabel);
      $thislabel.css('position', 'absolute');
      $thislabel.addClass('inside');
      
      // Add a contitional class to disting input from textarea (this is for styling purpose)
      $thislabel.addClass('for-'+$field.get(0).tagName.toLowerCase());
      
      // Check if a value is set
      if ($field.val() != '') {
        $thislabel.addClass('value-set');
      }
      
      // Add comportemental behaviors to the field
      $field
      .focus(function() {
        $thislabel.addClass('focus');
        $thislabel.css('top',$field.outerHeight());
      })
      .blur(function() {
        $thislabel.removeClass('focus');
        $thislabel.css('top', '');
        if ($(this).val() != '') {
          $thislabel.addClass('value-set');
        }
        else {
          $thislabel.removeClass('value-set');
        }
      });
    });
  }
  
})(jQuery);