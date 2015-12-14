SlideshowControl.prototype = new Object();
SlideshowControl.prototype.constructor = SlideshowControl;

function SlideshowControl(jQuery, gigapanIds, activeId, offImageURL, onImageURL, onClickHandler, buttonCssClass)
   {
   this.slideshowControlElement = document.createElement("div");
   this.buttons = [];

   // create the slideshow control buttons
   for (var i = 0; i < gigapanIds.length; i++)
      {
      var gigapanId = gigapanIds[i];

      // create the button
      this.buttons[i] = document.createElement("img");
      this.buttons[i].src = (activeId == gigapanId) ? onImageURL : offImageURL;
      this.buttons[i].id = "slideshow_button_image_" + gigapanId;
      this.buttons[i].alt = "";
      this.buttons[i].gigapanId = gigapanId;
      this.buttons[i].allButtons = this.buttons;
      this.buttons[i].onclick = function()
         {
         // turn all buttons off
         for (var j = 0; j < this.allButtons.length; j++)
            {
            this.allButtons[j].src = offImageURL;
            }

         // turn this button on
         this.src = onImageURL;

         // fire the onclick event handler, if defined
         if (onClickHandler)
            {
            onClickHandler(this.gigapanId);
            }
         };

      // create the button container
      this.buttons[i].className = buttonCssClass;
      jQuery(this.slideshowControlElement).append(this.buttons[i]);
      }

   this.getElement = function()
      {
      return this.slideshowControlElement;
      };
   }


