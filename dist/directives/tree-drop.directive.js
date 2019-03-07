import { Directive, Output, Input, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
var DRAG_OVER_CLASS = 'is-dragging-over';
var DRAG_DISABLED_CLASS = 'is-dragging-over-disabled';
var TreeDropDirective = /** @class */ (function () {
    function TreeDropDirective(el, treeDraggedElement) {
        this.el = el;
        this.treeDraggedElement = treeDraggedElement;
        this.onDropCallback = new EventEmitter();
        this.onDragOverCallback = new EventEmitter();
        this.onDragLeaveCallback = new EventEmitter();
        this.onDragEnterCallback = new EventEmitter();
        this._allowDrop = function (element, $event) { return true; };
    }
    Object.defineProperty(TreeDropDirective.prototype, "treeAllowDrop", {
        set: function (allowDrop) {
            if (allowDrop instanceof Function) {
                this._allowDrop = allowDrop;
            }
            else
                this._allowDrop = function (element, $event) { return allowDrop; };
        },
        enumerable: true,
        configurable: true
    });
    TreeDropDirective.prototype.allowDrop = function ($event) {
        return this._allowDrop(this.treeDraggedElement.get(), $event);
    };
    TreeDropDirective.prototype.onDragOver = function ($event) {
        if (!this.allowDrop($event))
            return this.addDisabledClass();
        this.onDragOverCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
        $event.preventDefault();
        this.addClass();
    };
    TreeDropDirective.prototype.onDragEnter = function ($event) {
        if (!this.allowDrop($event))
            return;
        this.onDragEnterCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
    };
    TreeDropDirective.prototype.onDragLeave = function ($event) {
        if (!this.allowDrop($event))
            return this.removeDisabledClass();
        this.onDragLeaveCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
        this.removeClass();
    };
    TreeDropDirective.prototype.onDrop = function ($event) {
        if (!this.allowDrop($event))
            return;
        $event.preventDefault();
        this.onDropCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
        this.removeClass();
        this.treeDraggedElement.set(null);
    };
    TreeDropDirective.prototype.addClass = function () {
        this.el.nativeElement.setAttribute('dropable', 'yes');
    };
    TreeDropDirective.prototype.removeClass = function () {
        this.el.nativeElement.setAttribute('dropable', '---');
    };
    TreeDropDirective.prototype.addDisabledClass = function () {
        this.el.nativeElement.setAttribute('dropable', 'not');
    };
    TreeDropDirective.prototype.removeDisabledClass = function () {
        this.el.nativeElement.setAttribute('dropable', '---');
    };
    TreeDropDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[treeDrop]'
                },] },
    ];
    /** @nocollapse */
    TreeDropDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: TreeDraggedElement, },
    ]; };
    TreeDropDirective.propDecorators = {
        'onDropCallback': [{ type: Output, args: ['treeDrop',] },],
        'onDragOverCallback': [{ type: Output, args: ['treeDropDragOver',] },],
        'onDragLeaveCallback': [{ type: Output, args: ['treeDropDragLeave',] },],
        'onDragEnterCallback': [{ type: Output, args: ['treeDropDragEnter',] },],
        'treeAllowDrop': [{ type: Input },],
        'onDragOver': [{ type: HostListener, args: ['dragover', ['$event'],] },],
        'onDragEnter': [{ type: HostListener, args: ['dragenter', ['$event'],] },],
        'onDragLeave': [{ type: HostListener, args: ['dragleave', ['$event'],] },],
        'onDrop': [{ type: HostListener, args: ['drop', ['$event'],] },],
    };
    return TreeDropDirective;
}());
export { TreeDropDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kaXJlY3RpdmVzL3RyZWUtZHJvcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVyxNQUFBLEVBQVEsS0FBQSxFQUFPLFlBQUEsRUFBYyxZQUFBLEVBQWMsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUNqRyxPQUFPLEVBQUUsa0JBQUEsRUFBbUIsTUFBTyxzQ0FBQSxDQUF1QztBQUUxRSxJQUFNLGVBQUEsR0FBa0Isa0JBQUEsQ0FBbUI7QUFDM0MsSUFBTSxtQkFBQSxHQUFzQiwyQkFBQSxDQUE0QjtBQUd4RDtJQWlCRSwyQkFBb0IsRUFBYyxFQUFVLGtCQUFzQztRQUE5RCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQWhCakYsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3BDLHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEMsd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN6Qyx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxDLGVBQVUsR0FBRyxVQUFDLE9BQU8sRUFBRSxNQUFNLElBQUssT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDO0lBWS9DLENBQUM7SUFYQSxzQkFBSSw0Q0FBYTthQUFqQixVQUFrQixTQUFTO1lBQzFCLElBQUksU0FBUyxZQUFZLFFBQVEsRUFBRTtnQkFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7YUFDN0I7O2dCQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBQyxPQUFPLEVBQUUsTUFBTSxJQUFLLE9BQUEsU0FBUyxFQUFULENBQVMsQ0FBQztRQUN4RCxDQUFDOzs7T0FBQTtJQUNELHFDQUFTLEdBQVQsVUFBVSxNQUFNO1FBQ2QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FB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dXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgT3V0cHV0LCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVHJlZURyYWdnZWRFbGVtZW50IH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtZHJhZ2dlZC1lbGVtZW50Lm1vZGVsJztcclxuXHJcbmNvbnN0IERSQUdfT1ZFUl9DTEFTUyA9ICdpcy1kcmFnZ2luZy1vdmVyJztcclxuY29uc3QgRFJBR19ESVNBQkxFRF9DTEFTUyA9ICdpcy1kcmFnZ2luZy1vdmVyLWRpc2FibGVkJztcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVHJlZURyb3BEaXJlY3RpdmUge1xyXG4gICBvbkRyb3BDYWxsYmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgb25EcmFnT3ZlckNhbGxiYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICBvbkRyYWdMZWF2ZUNhbGxiYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICBvbkRyYWdFbnRlckNhbGxiYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBwcml2YXRlIF9hbGxvd0Ryb3AgPSAoZWxlbWVudCwgJGV2ZW50KSA9PiB0cnVlO1xyXG4gICBzZXQgdHJlZUFsbG93RHJvcChhbGxvd0Ryb3ApIHtcclxuICAgIGlmIChhbGxvd0Ryb3AgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICB0aGlzLl9hbGxvd0Ryb3AgPSBhbGxvd0Ryb3A7XHJcbiAgICB9XHJcbiAgICBlbHNlIHRoaXMuX2FsbG93RHJvcCA9IChlbGVtZW50LCAkZXZlbnQpID0+IGFsbG93RHJvcDtcclxuICB9XHJcbiAgYWxsb3dEcm9wKCRldmVudCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FsbG93RHJvcCh0aGlzLnRyZWVEcmFnZ2VkRWxlbWVudC5nZXQoKSwgJGV2ZW50KTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgdHJlZURyYWdnZWRFbGVtZW50OiBUcmVlRHJhZ2dlZEVsZW1lbnQpIHtcclxuICB9XHJcblxyXG4gICBvbkRyYWdPdmVyKCRldmVudCkge1xyXG4gICAgaWYgKCF0aGlzLmFsbG93RHJvcCgkZXZlbnQpKSByZXR1cm4gdGhpcy5hZGREaXNhYmxlZENsYXNzKCk7XHJcblxyXG4gICAgdGhpcy5vbkRyYWdPdmVyQ2FsbGJhY2suZW1pdCh7ZXZlbnQ6ICRldmVudCwgZWxlbWVudDogdGhpcy50cmVlRHJhZ2dlZEVsZW1lbnQuZ2V0KCl9KTtcclxuXHJcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMuYWRkQ2xhc3MoKTtcclxuICB9XHJcblxyXG4gICBvbkRyYWdFbnRlcigkZXZlbnQpIHtcclxuICAgIGlmICghdGhpcy5hbGxvd0Ryb3AoJGV2ZW50KSkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMub25EcmFnRW50ZXJDYWxsYmFjay5lbWl0KHtldmVudDogJGV2ZW50LCBlbGVtZW50OiB0aGlzLnRyZWVEcmFnZ2VkRWxlbWVudC5nZXQoKX0pO1xyXG4gIH1cclxuXHJcbiAgIG9uRHJhZ0xlYXZlKCRldmVudCkge1xyXG4gICAgaWYgKCF0aGlzLmFsbG93RHJvcCgkZXZlbnQpKSByZXR1cm4gdGhpcy5yZW1vdmVEaXNhYmxlZENsYXNzKCk7XHJcblxyXG4gICAgdGhpcy5vbkRyYWdMZWF2ZUNhbGxiYWNrLmVtaXQoe2V2ZW50OiAkZXZlbnQsIGVsZW1lbnQ6IHRoaXMudHJlZURyYWdnZWRFbGVtZW50LmdldCgpfSk7XHJcblxyXG4gICAgdGhpcy5yZW1vdmVDbGFzcygpO1xyXG4gIH1cclxuXHJcbiAgIG9uRHJvcCgkZXZlbnQpIHtcclxuICAgIGlmICghdGhpcy5hbGxvd0Ryb3AoJGV2ZW50KSkgcmV0dXJuO1xyXG5cclxuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy5vbkRyb3BDYWxsYmFjay5lbWl0KHtldmVudDogJGV2ZW50LCBlbGVtZW50OiB0aGlzLnRyZWVEcmFnZ2VkRWxlbWVudC5nZXQoKX0pO1xyXG4gICAgdGhpcy5yZW1vdmVDbGFzcygpO1xyXG4gICAgdGhpcy50cmVlRHJhZ2dlZEVsZW1lbnQuc2V0KG51bGwpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRDbGFzcygpIHtcclxuICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2Ryb3BhYmxlJywgJ3llcycpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW1vdmVDbGFzcygpIHtcclxuICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2Ryb3BhYmxlJywgJy0tLScpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGREaXNhYmxlZENsYXNzKCkge1xyXG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnZHJvcGFibGUnLCAnLW5vJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbW92ZURpc2FibGVkQ2xhc3MoKSB7XHJcbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkcm9wYWJsZScsICctLS0nKTtcclxuICB9XHJcbnN0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IERpcmVjdGl2ZSwgYXJnczogW3tcclxuICBzZWxlY3RvcjogJ1t0cmVlRHJvcF0nXHJcbn0sIF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbnN0YXRpYyBjdG9yUGFyYW1ldGVyczogKCkgPT4gKHt0eXBlOiBhbnksIGRlY29yYXRvcnM/OiBEZWNvcmF0b3JJbnZvY2F0aW9uW119fG51bGwpW10gPSAoKSA9PiBbXG57dHlwZTogRWxlbWVudFJlZiwgfSxcbnt0eXBlOiBUcmVlRHJhZ2dlZEVsZW1lbnQsIH0sXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbidvbkRyb3BDYWxsYmFjayc6IFt7IHR5cGU6IE91dHB1dCwgYXJnczogWyd0cmVlRHJvcCcsIF0gfSxdLFxuJ29uRHJhZ092ZXJDYWxsYmFjayc6IFt7IHR5cGU6IE91dHB1dCwgYXJnczogWyd0cmVlRHJvcERyYWdPdmVyJywgXSB9LF0sXG4nb25EcmFnTGVhdmVDYWxsYmFjayc6IFt7IHR5cGU6IE91dHB1dCwgYXJnczogWyd0cmVlRHJvcERyYWdMZWF2ZScsIF0gfSxdLFxuJ29uRHJhZ0VudGVyQ2FsbGJhY2snOiBbeyB0eXBlOiBPdXRwdXQsIGFyZ3M6IFsndHJlZURyb3BEcmFnRW50ZXInLCBdIH0sXSxcbid0cmVlQWxsb3dEcm9wJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ29uRHJhZ092ZXInOiBbeyB0eXBlOiBIb3N0TGlzdGVuZXIsIGFyZ3M6IFsnZHJhZ292ZXInLCBbJyRldmVudCddLCBdIH0sXSxcbidvbkRyYWdFbnRlcic6IFt7IHR5cGU6IEhvc3RMaXN0ZW5lciwgYXJnczogWydkcmFnZW50ZXInLCBbJyRldmVudCddLCBdIH0sXSxcbidvbkRyYWdMZWF2ZSc6IFt7IHR5cGU6IEhvc3RMaXN0ZW5lciwgYXJnczogWydkcmFnbGVhdmUnLCBbJyRldmVudCddLCBdIH0sXSxcbidvbkRyb3AnOiBbeyB0eXBlOiBIb3N0TGlzdGVuZXIsIGFyZ3M6IFsnZHJvcCcsIFsnJGV2ZW50J10sIF0gfSxdLFxufTtcbn1cclxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=