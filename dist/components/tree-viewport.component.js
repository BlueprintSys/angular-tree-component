import { Component, ElementRef, HostListener } from '@angular/core';
import { TreeVirtualScroll } from '../models/tree-virtual-scroll.model';
import { TREE_EVENTS } from '../constants/events';
var TreeViewportComponent = /** @class */ (function () {
    function TreeViewportComponent(elementRef, virtualScroll) {
        this.elementRef = elementRef;
        this.virtualScroll = virtualScroll;
    }
    TreeViewportComponent.prototype.ngOnInit = function () {
        this.virtualScroll.init();
    };
    TreeViewportComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.setViewport();
            _this.virtualScroll.fireEvent({ eventName: TREE_EVENTS.initialized });
        });
    };
    TreeViewportComponent.prototype.ngOnDestroy = function () {
        this.virtualScroll.clear();
    };
    TreeViewportComponent.prototype.getTotalHeight = function () {
        return this.virtualScroll.isEnabled() && this.virtualScroll.totalHeight + 'px' || 'auto';
    };
    TreeViewportComponent.prototype.onScroll = function () {
        this.setViewport();
    };
    TreeViewportComponent.prototype.setViewport = function () {
        this.virtualScroll.setViewport(this.elementRef.nativeElement);
    };
    TreeViewportComponent.decorators = [
        { type: Component, args: [{
                    selector: 'tree-viewport',
                    styles: [],
                    providers: [TreeVirtualScroll],
                    template: "\n    <ng-container *mobxAutorun=\"{dontDetach: true}\">\n      <div [style.height]=\"getTotalHeight()\">\n        <ng-content></ng-content>\n      </div>\n    </ng-container>\n  "
                },] },
    ];
    /** @nocollapse */
    TreeViewportComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: TreeVirtualScroll, },
    ]; };
    TreeViewportComponent.propDecorators = {
        'onScroll': [{ type: HostListener, args: ['scroll', ['$event'],] },],
    };
    return TreeViewportComponent;
}());
export { TreeViewportComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3RyZWUtdmlld3BvcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsVUFBQSxFQUErQixZQUFBLEVBQzNDLE1BQU0sZUFBQSxDQUFnQjtBQUN2QixPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyxxQ0FBQSxDQUFzQztBQUN4RSxPQUFPLEVBQUUsV0FBQSxFQUFZLE1BQU8scUJBQUEsQ0FBc0I7QUFHbEQ7SUFDRSwrQkFDVSxVQUFzQixFQUN2QixhQUFnQztRQUQvQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3ZCLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtJQUN6QyxDQUFDO0lBRUQsd0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELCtDQUFlLEdBQWY7UUFBQSxpQkFLQztRQUpDLFVBQVUsQ0FBQztZQUNULEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixLQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUN2RSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwyQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsOENBQWMsR0FBZDtRQUNFLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsR0FBRyxJQUFJLElBQUksTUFBTSxDQUFDO0lBQzNGLENBQUM7SUFHRCx3Q0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCwyQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBQ0ksZ0NBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsZUFBZTtvQkFDekIsTUFBTSxFQUFFLEVBQUU7b0JBQ1YsU0FBUyxFQUFFLENBQUMsaUJBQWlCLENBQUM7b0JBQzlCLFFBQVEsRUFBRSxxTEFNVDtpQkFDRixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsb0NBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLFVBQVUsR0FBRztRQUNwQixFQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRztLQUMxQixFQUg2RixDQUc3RixDQUFDO0lBQ0ssb0NBQWMsR0FBMkM7UUFDaEUsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFHLEVBQUUsRUFBRTtLQUNwRSxDQUFDO0lBQ0YsNEJBQUM7Q0F2REQsQUF1REMsSUFBQTtTQXZEWSxxQkFBcUIiLCJmaWxlIjoidHJlZS12aWV3cG9ydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsIEVsZW1lbnRSZWYsIFZpZXdFbmNhcHN1bGF0aW9uLCBIb3N0TGlzdGVuZXIsIEFmdGVyVmlld0luaXQsIE9uSW5pdCwgT25EZXN0cm95XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyZWVWaXJ0dWFsU2Nyb2xsIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtdmlydHVhbC1zY3JvbGwubW9kZWwnO1xyXG5pbXBvcnQgeyBUUkVFX0VWRU5UUyB9IGZyb20gJy4uL2NvbnN0YW50cy9ldmVudHMnO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBUcmVlVmlld3BvcnRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBwdWJsaWMgdmlydHVhbFNjcm9sbDogVHJlZVZpcnR1YWxTY3JvbGwpIHtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy52aXJ0dWFsU2Nyb2xsLmluaXQoKTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLnNldFZpZXdwb3J0KCk7XHJcbiAgICAgIHRoaXMudmlydHVhbFNjcm9sbC5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLmluaXRpYWxpemVkIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMudmlydHVhbFNjcm9sbC5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VG90YWxIZWlnaHQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy52aXJ0dWFsU2Nyb2xsLmlzRW5hYmxlZCgpICYmIHRoaXMudmlydHVhbFNjcm9sbC50b3RhbEhlaWdodCArICdweCcgfHwgJ2F1dG8nO1xyXG4gIH1cclxuXHJcbiAgXHJcbiAgb25TY3JvbGwoKSB7XHJcbiAgICB0aGlzLnNldFZpZXdwb3J0KCk7XHJcbiAgfVxyXG5cclxuICBzZXRWaWV3cG9ydCgpIHtcclxuICAgIHRoaXMudmlydHVhbFNjcm9sbC5zZXRWaWV3cG9ydCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XHJcbiAgfVxyXG5zdGF0aWMgZGVjb3JhdG9yczogRGVjb3JhdG9ySW52b2NhdGlvbltdID0gW1xueyB0eXBlOiBDb21wb25lbnQsIGFyZ3M6IFt7XHJcbiAgc2VsZWN0b3I6ICd0cmVlLXZpZXdwb3J0JyxcclxuICBzdHlsZXM6IFtdLFxyXG4gIHByb3ZpZGVyczogW1RyZWVWaXJ0dWFsU2Nyb2xsXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLWNvbnRhaW5lciAqbW9ieEF1dG9ydW49XCJ7ZG9udERldGFjaDogdHJ1ZX1cIj5cclxuICAgICAgPGRpdiBbc3R5bGUuaGVpZ2h0XT1cImdldFRvdGFsSGVpZ2h0KClcIj5cclxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcbiAgYFxyXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICgpID0+ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gKCkgPT4gW1xue3R5cGU6IEVsZW1lbnRSZWYsIH0sXG57dHlwZTogVHJlZVZpcnR1YWxTY3JvbGwsIH0sXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbidvblNjcm9sbCc6IFt7IHR5cGU6IEhvc3RMaXN0ZW5lciwgYXJnczogWydzY3JvbGwnLCBbJyRldmVudCddLCBdIH0sXSxcbn07XG59XHJcblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19