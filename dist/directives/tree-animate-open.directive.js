import { Directive, Input, Renderer, TemplateRef, ViewContainerRef } from '@angular/core';
var EASE_ACCELERATION = 1.005;
var TreeAnimateOpenDirective = /** @class */ (function () {
    function TreeAnimateOpenDirective(renderer, templateRef, viewContainerRef) {
        this.renderer = renderer;
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
    }
    Object.defineProperty(TreeAnimateOpenDirective.prototype, "isOpen", {
        set: function (value) {
            if (value) {
                this._show();
                if (this.isEnabled && this._isOpen === false) {
                    this._animateOpen();
                }
            }
            else {
                this.isEnabled ? this._animateClose() : this._hide();
            }
            this._isOpen = !!value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    TreeAnimateOpenDirective.prototype._show = function () {
        if (this.innerElement)
            return;
        // create child view
        this.innerElement = this.viewContainerRef.createEmbeddedView(this.templateRef).rootNodes[0];
    };
    TreeAnimateOpenDirective.prototype._hide = function () {
        this.viewContainerRef.clear();
        this.innerElement = null;
    };
    TreeAnimateOpenDirective.prototype._animateOpen = function () {
        var _this = this;
        var delta = this.animateSpeed;
        var ease = this.animateAcceleration;
        var maxHeight = 0;
        // set height to 0
        this.renderer.setElementStyle(this.innerElement, 'max-height', "0");
        // increase maxHeight until height doesn't change
        setTimeout(function () {
            var i = setInterval(function () {
                if (!_this._isOpen || !_this.innerElement)
                    return clearInterval(i);
                maxHeight += delta;
                var roundedMaxHeight = Math.round(maxHeight);
                _this.renderer.setElementStyle(_this.innerElement, 'max-height', roundedMaxHeight + "px");
                var height = _this.innerElement.getBoundingClientRect ? _this.innerElement.getBoundingClientRect().height : 0; // TBD use renderer
                delta *= ease;
                ease *= EASE_ACCELERATION;
                if (height < roundedMaxHeight) {
                    // Make maxHeight auto because animation finished and container might change height later on
                    _this.renderer.setElementStyle(_this.innerElement, 'max-height', null);
                    clearInterval(i);
                }
            }, 17);
        });
    };
    TreeAnimateOpenDirective.prototype._animateClose = function () {
        var _this = this;
        if (!this.innerElement)
            return;
        var delta = this.animateSpeed;
        var ease = this.animateAcceleration;
        var height = this.innerElement.getBoundingClientRect().height; // TBD use renderer
        // slowly decrease maxHeight to 0, starting from current height
        var i = setInterval(function () {
            if (_this._isOpen || !_this.innerElement)
                return clearInterval(i);
            height -= delta;
            _this.renderer.setElementStyle(_this.innerElement, 'max-height', height + "px");
            delta *= ease;
            ease *= EASE_ACCELERATION;
            if (height <= 0) {
                // after animation complete - remove child element
                _this.viewContainerRef.clear();
                _this.innerElement = null;
                clearInterval(i);
            }
        }, 17);
    };
    TreeAnimateOpenDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[treeAnimateOpen]'
                },] },
    ];
    /** @nocollapse */
    TreeAnimateOpenDirective.ctorParameters = function () { return [
        { type: Renderer, },
        { type: TemplateRef, },
        { type: ViewContainerRef, },
    ]; };
    TreeAnimateOpenDirective.propDecorators = {
        'animateSpeed': [{ type: Input, args: ['treeAnimateOpenSpeed',] },],
        'animateAcceleration': [{ type: Input, args: ['treeAnimateOpenAcceleration',] },],
        'isEnabled': [{ type: Input, args: ['treeAnimateOpenEnabled',] },],
        'isOpen': [{ type: Input, args: ['treeAnimateOpen',] },],
    };
    return TreeAnimateOpenDirective;
}());
export { TreeAnimateOpenDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kaXJlY3RpdmVzL3RyZWUtYW5pbWF0ZS1vcGVuLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLEtBQUEsRUFBcUIsUUFBQSxFQUN2QixXQUFBLEVBQWEsZ0JBQUEsRUFDdkIsTUFBTSxlQUFBLENBQWdCO0FBRXZCLElBQU0saUJBQUEsR0FBb0IsS0FBQSxDQUFNO0FBR2hDO0lBc0JFLGtDQUNVLFFBQWtCLEVBQ2xCLFdBQTZCLEVBQzdCLGdCQUFrQztRQUZsQyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUM3QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQUcsQ0FBQztJQWpCaEQsc0JBQUksNENBQU07YUFBVixVQUFXLEtBQWM7WUFDdkIsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNiLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLEtBQUssRUFBRTtvQkFDNUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2lCQUNyQjthQUNGO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3REO1lBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBQUEsQ0FBQztJQVNNLHdDQUFLLEdBQWI7UUFDRSxJQUFJLElBQUksQ0FBQyxZQUFZO1lBQUUsT0FBTztRQUU5QixvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFD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LENBQUM7YUFDbEI7UUFDSCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVCxDQUFDO0lBQ0ksbUNBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsbUJBQW1CO2lCQUM5QixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsdUNBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLFFBQVEsR0FBRztRQUNsQixFQUFDLElBQUksRUFBRSxXQUFXLEdBQUc7UUFDckIsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEdBQUc7S0FDekIsRUFKNkYsQ0FJN0YsQ0FBQztJQUNLLHVDQUFjLEdBQTJDO1FBQ2hFLGNBQWMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRyxFQUFFLEVBQUU7UUFDcEUscUJBQXFCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsNkJBQTZCLEVBQUcsRUFBRSxFQUFFO1FBQ2xGLFdBQVcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRyxFQUFFLEVBQUU7UUFDbkUsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLGlCQUFpQixFQUFHLEVBQUUsRUFBRTtLQUN4RCxDQUFDO0lBQ0YsK0JBQUM7Q0E5R0QsQUE4R0MsSUFBQTtTQTlHWSx3QkFBd0IiLCJmaWxlIjoidHJlZS1hbmltYXRlLW9wZW4uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLCBJbnB1dCwgSG9zdExpc3RlbmVyLCBSZW5kZXJlciwgRWxlbWVudFJlZixcclxuICBEb0NoZWNrLCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuY29uc3QgRUFTRV9BQ0NFTEVSQVRJT04gPSAxLjAwNTtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVHJlZUFuaW1hdGVPcGVuRGlyZWN0aXZlIHtcclxuICBwcml2YXRlIF9pc09wZW46IGJvb2xlYW47XHJcblxyXG4gICBhbmltYXRlU3BlZWQ6IG51bWJlcjtcclxuICAgYW5pbWF0ZUFjY2VsZXJhdGlvbjogbnVtYmVyO1xyXG4gICBpc0VuYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gIFxyXG4gIHNldCBpc09wZW4odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9zaG93KCk7XHJcbiAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCAmJiB0aGlzLl9pc09wZW4gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5fYW5pbWF0ZU9wZW4oKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pc0VuYWJsZWQgPyB0aGlzLl9hbmltYXRlQ2xvc2UoKSA6IHRoaXMuX2hpZGUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuX2lzT3BlbiA9ICEhdmFsdWU7XHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSBpbm5lckVsZW1lbnQ6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcixcclxuICAgIHByaXZhdGUgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sXHJcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHt9XHJcblxyXG4gIHByaXZhdGUgX3Nob3coKSB7XHJcbiAgICBpZiAodGhpcy5pbm5lckVsZW1lbnQpIHJldHVybjtcclxuXHJcbiAgICAvLyBjcmVhdGUgY2hpbGQgdmlld1xyXG4gICAgdGhpcy5pbm5lckVsZW1lbnQgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGVSZWYpLnJvb3ROb2Rlc1swXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2hpZGUoKSB7XHJcbiAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcclxuICAgIHRoaXMuaW5uZXJFbGVtZW50ID0gbnVsbDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2FuaW1hdGVPcGVuKCkge1xyXG4gICAgbGV0IGRlbHRhID0gdGhpcy5hbmltYXRlU3BlZWQ7XHJcbiAgICBsZXQgZWFzZSA9IHRoaXMuYW5pbWF0ZUFjY2VsZXJhdGlvbjtcclxuICAgIGxldCBtYXhIZWlnaHQgPSAwO1xyXG5cclxuICAgIC8vIHNldCBoZWlnaHQgdG8gMFxyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5pbm5lckVsZW1lbnQsICdtYXgtaGVpZ2h0JywgYDBgKTtcclxuXHJcbiAgICAvLyBpbmNyZWFzZSBtYXhIZWlnaHQgdW50aWwgaGVpZ2h0IGRvZXNuJ3QgY2hhbmdlXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHsgLy8gQWxsb3cgaW5uZXIgZWxlbWVudCB0byBjcmVhdGUgaXRzIGNvbnRlbnRcclxuICAgICAgY29uc3QgaSA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzT3BlbiB8fCAhdGhpcy5pbm5lckVsZW1lbnQpIHJldHVybiBjbGVhckludGVydmFsKGkpO1xyXG5cclxuICAgICAgICBtYXhIZWlnaHQgKz0gZGVsdGE7XHJcbiAgICAgICAgY29uc3Qgcm91bmRlZE1heEhlaWdodCA9IE1hdGgucm91bmQobWF4SGVpZ2h0KTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5pbm5lckVsZW1lbnQsICdtYXgtaGVpZ2h0JywgYCR7cm91bmRlZE1heEhlaWdodH1weGApO1xyXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuaW5uZXJFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCA/IHRoaXMuaW5uZXJFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCA6IDA7IC8vIFRCRCB1c2UgcmVuZGVyZXJcclxuXHJcbiAgICAgICAgZGVsdGEgKj0gZWFzZTtcclxuICAgICAgICBlYXNlICo9IEVBU0VfQUNDRUxFUkFUSU9OO1xyXG4gICAgICAgIGlmIChoZWlnaHQgPCByb3VuZGVkTWF4SGVpZ2h0KSB7XHJcbiAgICAgICAgICAvLyBNYWtlIG1heEhlaWdodCBhdXRvIGJlY2F1c2UgYW5pbWF0aW9uIGZpbmlzaGVkIGFuZCBjb250YWluZXIgbWlnaHQgY2hhbmdlIGhlaWdodCBsYXRlciBvblxyXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5pbm5lckVsZW1lbnQsICdtYXgtaGVpZ2h0JywgbnVsbCk7XHJcbiAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgMTcpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9hbmltYXRlQ2xvc2UoKSB7XHJcbiAgICBpZiAoIXRoaXMuaW5uZXJFbGVtZW50KSByZXR1cm47XHJcblxyXG4gICAgbGV0IGRlbHRhID0gdGhpcy5hbmltYXRlU3BlZWQ7XHJcbiAgICBsZXQgZWFzZSA9IHRoaXMuYW5pbWF0ZUFjY2VsZXJhdGlvbjtcclxuICAgIGxldCBoZWlnaHQgPSB0aGlzLmlubmVyRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7IC8vIFRCRCB1c2UgcmVuZGVyZXJcclxuXHJcbiAgICAvLyBzbG93bHkgZGVjcmVhc2UgbWF4SGVpZ2h0IHRvIDAsIHN0YXJ0aW5nIGZyb20gY3VycmVudCBoZWlnaHRcclxuICAgIGNvbnN0IGkgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLl9pc09wZW4gfHwgIXRoaXMuaW5uZXJFbGVtZW50KSByZXR1cm4gY2xlYXJJbnRlcnZhbChpKTtcclxuXHJcbiAgICAgIGhlaWdodCAtPSBkZWx0YTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5pbm5lckVsZW1lbnQsICdtYXgtaGVpZ2h0JywgYCR7aGVpZ2h0fXB4YCk7XHJcbiAgICAgIGRlbHRhICo9IGVhc2U7XHJcbiAgICAgIGVhc2UgKj0gRUFTRV9BQ0NFTEVSQVRJT047XHJcblxyXG4gICAgICBpZiAoaGVpZ2h0IDw9IDApIHtcclxuICAgICAgICAvLyBhZnRlciBhbmltYXRpb24gY29tcGxldGUgLSByZW1vdmUgY2hpbGQgZWxlbWVudFxyXG4gICAgICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuaW5uZXJFbGVtZW50ID0gbnVsbDtcclxuICAgICAgICBjbGVhckludGVydmFsKGkpO1xyXG4gICAgICB9XHJcbiAgICB9LCAxNyk7XHJcbiAgfVxyXG5zdGF0aWMgZGVjb3JhdG9yczogRGVjb3JhdG9ySW52b2NhdGlvbltdID0gW1xueyB0eXBlOiBEaXJlY3RpdmUsIGFyZ3M6IFt7XHJcbiAgc2VsZWN0b3I6ICdbdHJlZUFuaW1hdGVPcGVuXSdcclxufSwgXSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuc3RhdGljIGN0b3JQYXJhbWV0ZXJzOiAoKSA9PiAoe3R5cGU6IGFueSwgZGVjb3JhdG9ycz86IERlY29yYXRvckludm9jYXRpb25bXX18bnVsbClbXSA9ICgpID0+IFtcbnt0eXBlOiBSZW5kZXJlciwgfSxcbnt0eXBlOiBUZW1wbGF0ZVJlZiwgfSxcbnt0eXBlOiBWaWV3Q29udGFpbmVyUmVmLCB9LFxuXTtcbnN0YXRpYyBwcm9wRGVjb3JhdG9yczoge1trZXk6IHN0cmluZ106IERlY29yYXRvckludm9jYXRpb25bXX0gPSB7XG4nYW5pbWF0ZVNwZWVkJzogW3sgdHlwZTogSW5wdXQsIGFyZ3M6IFsndHJlZUFuaW1hdGVPcGVuU3BlZWQnLCBdIH0sXSxcbidhbmltYXRlQWNjZWxlcmF0aW9uJzogW3sgdHlwZTogSW5wdXQsIGFyZ3M6IFsndHJlZUFuaW1hdGVPcGVuQWNjZWxlcmF0aW9uJywgXSB9LF0sXG4naXNFbmFibGVkJzogW3sgdHlwZTogSW5wdXQsIGFyZ3M6IFsndHJlZUFuaW1hdGVPcGVuRW5hYmxlZCcsIF0gfSxdLFxuJ2lzT3Blbic6IFt7IHR5cGU6IElucHV0LCBhcmdzOiBbJ3RyZWVBbmltYXRlT3BlbicsIF0gfSxdLFxufTtcbn1cclxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=