import { Directive, Output, Input, EventEmitter, ElementRef, NgZone } from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
var DRAG_OVER_CLASS = 'is-dragging-over';
var DRAG_DISABLED_CLASS = 'is-dragging-over-disabled';
var TreeDropDirective = /** @class */ (function () {
    function TreeDropDirective(ngZone, el, treeDraggedElement) {
        this.ngZone = ngZone;
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
    TreeDropDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            _this.el.nativeElement.addEventListener('dragover', function (evt) { return _this.onDragOver(evt); });
            _this.el.nativeElement.addEventListener('dragenter', function (evt) { return _this.onDragEnter(evt); });
            _this.el.nativeElement.addEventListener('dragleave', function (evt) { return _this.onDragLeave(evt); });
            _this.el.nativeElement.addEventListener('drop', function (evt) { return _this.onDrop(evt); });
        });
    };
    TreeDropDirective.prototype.ngOnDestroy = function () {
        var _this = this;
        this.el.nativeElement.removeEventListener('dragover', function (evt) { return _this.onDragOver(evt); });
        this.el.nativeElement.removeEventListener('dragenter', function (evt) { return _this.onDragEnter(evt); });
        this.el.nativeElement.removeEventListener('dragleave', function (evt) { return _this.onDragLeave(evt); });
        this.el.nativeElement.removeEventListener('drop', function (evt) { return _this.onDrop(evt); });
    };
    // @HostListener('dragover', ['$event'])
    TreeDropDirective.prototype.onDragOver = function ($event) {
        console.log('onDragOver');
        if (!this.allowDrop($event))
            return this.addDisabledClass();
        this.onDragOverCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
        $event.preventDefault();
        this.addClass();
    };
    // @HostListener('dragenter', ['$event'])
    TreeDropDirective.prototype.onDragEnter = function ($event) {
        console.log('onDragEnter');
        if (!this.allowDrop($event))
            return;
        this.onDragEnterCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
    };
    // @HostListener('dragleave', ['$event'])
    TreeDropDirective.prototype.onDragLeave = function ($event) {
        console.log('onDragLeave');
        if (!this.allowDrop($event))
            return this.removeDisabledClass();
        this.onDragLeaveCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
        this.removeClass();
    };
    // @HostListener('drop', ['$event'])
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
        { type: NgZone, },
        { type: ElementRef, },
        { type: TreeDraggedElement, },
    ]; };
    TreeDropDirective.propDecorators = {
        'onDropCallback': [{ type: Output, args: ['treeDrop',] },],
        'onDragOverCallback': [{ type: Output, args: ['treeDropDragOver',] },],
        'onDragLeaveCallback': [{ type: Output, args: ['treeDropDragLeave',] },],
        'onDragEnterCallback': [{ type: Output, args: ['treeDropDragEnter',] },],
        'treeAllowDrop': [{ type: Input },],
    };
    return TreeDropDirective;
}());
export { TreeDropDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kaXJlY3RpdmVzL3RyZWUtZHJvcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVyxNQUFBLEVBQVEsS0FBQSxFQUFPLFlBQUEsRUFBNEIsVUFBQSxFQUEyQixNQUFBLEVBQWtCLE1BQU8sZUFBQSxDQUFnQjtBQUNuSSxPQUFPLEVBQUUsa0JBQUEsRUFBbUIsTUFBTyxzQ0FBQSxDQUF1QztBQUUxRSxJQUFNLGVBQUEsR0FBa0Isa0JBQUEsQ0FBbUI7QUFDM0MsSUFBTSxtQkFBQSxHQUFzQiwyQkFBQSxDQUE0QjtBQUd4RDtJQWlCRSwyQkFBb0IsTUFBYyxFQUFVLEVBQWMsRUFBVSxrQkFBc0M7UUFBdEYsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBaEJ6RyxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDcEMsdUJBQWtCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN4Qyx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3pDLHdCQUFtQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEMsZUFBVSxHQUFHLFVBQUMsT0FBTyxFQUFFLE1BQU0sSUFBSyxPQUFBLElBQUksRUFBSixDQUFJLENBQUM7SUFZL0MsQ0FBQztJQVhBLHNCQUFJLDRDQUFhO2FBQWpCLFVBQWtCLFNBQVM7WUFDMUIsSUFBSSxTQUFTLFlBQVksUUFBUSxFQUFFO2dCQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQzthQUM3Qjs7Z0JBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFDLE9BQU8sRUFBRSxNQUFNLElBQUssT0FBQSxTQUFTLEVBQVQsQ0FBUyxDQUFDO1FBQ3hELENBQUM7OztPQUFBO0lBQ0QscUNBQVMsR0FBVCxVQUFVLE1BQU07UUFDZCxPQUFPLElB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IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgT3V0cHV0LCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQsIE5nWm9uZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyZWVEcmFnZ2VkRWxlbWVudCB9IGZyb20gJy4uL21vZGVscy90cmVlLWRyYWdnZWQtZWxlbWVudC5tb2RlbCc7XHJcblxyXG5jb25zdCBEUkFHX09WRVJfQ0xBU1MgPSAnaXMtZHJhZ2dpbmctb3Zlcic7XHJcbmNvbnN0IERSQUdfRElTQUJMRURfQ0xBU1MgPSAnaXMtZHJhZ2dpbmctb3Zlci1kaXNhYmxlZCc7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFRyZWVEcm9wRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuICAgb25Ecm9wQ2FsbGJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgIG9uRHJhZ092ZXJDYWxsYmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgb25EcmFnTGVhdmVDYWxsYmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgb25EcmFnRW50ZXJDYWxsYmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgcHJpdmF0ZSBfYWxsb3dEcm9wID0gKGVsZW1lbnQsICRldmVudCkgPT4gdHJ1ZTtcclxuICAgc2V0IHRyZWVBbGxvd0Ryb3AoYWxsb3dEcm9wKSB7XHJcbiAgICBpZiAoYWxsb3dEcm9wIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgdGhpcy5fYWxsb3dEcm9wID0gYWxsb3dEcm9wO1xyXG4gICAgfVxyXG4gICAgZWxzZSB0aGlzLl9hbGxvd0Ryb3AgPSAoZWxlbWVudCwgJGV2ZW50KSA9PiBhbGxvd0Ryb3A7XHJcbiAgfVxyXG4gIGFsbG93RHJvcCgkZXZlbnQpIHtcclxuICAgIHJldHVybiB0aGlzLl9hbGxvd0Ryb3AodGhpcy50cmVlRHJhZ2dlZEVsZW1lbnQuZ2V0KCksICRldmVudCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIHRyZWVEcmFnZ2VkRWxlbWVudDogVHJlZURyYWdnZWRFbGVtZW50KSB7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGV2dCA9PiB0aGlzLm9uRHJhZ092ZXIoZXZ0KSk7XHJcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBldnQgPT4gdGhpcy5vbkRyYWdFbnRlcihldnQpKTtcclxuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIGV2dCA9PiB0aGlzLm9uRHJhZ0xlYXZlKGV2dCkpO1xyXG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGV2dCA9PiB0aGlzLm9uRHJvcChldnQpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBldnQgPT4gdGhpcy5vbkRyYWdPdmVyKGV2dCkpO1xyXG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIGV2dCA9PiB0aGlzLm9uRHJhZ0VudGVyKGV2dCkpO1xyXG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIGV2dCA9PiB0aGlzLm9uRHJhZ0xlYXZlKGV2dCkpO1xyXG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBldnQgPT4gdGhpcy5vbkRyb3AoZXZ0KSk7XHJcbiAgfVxyXG5cclxuICAvLyBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pXHJcbiAgb25EcmFnT3ZlcigkZXZlbnQpIHtcclxuICAgIGlmICghdGhpcy5hbGxvd0Ryb3AoJGV2ZW50KSkgcmV0dXJuIHRoaXMuYWRkRGlzYWJsZWRDbGFzcygpO1xyXG5cclxuICAgIHRoaXMub25EcmFnT3ZlckNhbGxiYWNrLmVtaXQoe2V2ZW50OiAkZXZlbnQsIGVsZW1lbnQ6IHRoaXMudHJlZURyYWdnZWRFbGVtZW50LmdldCgpfSk7XHJcblxyXG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLmFkZENsYXNzKCk7XHJcbiAgfVxyXG5cclxuICAvLyBASG9zdExpc3RlbmVyKCdkcmFnZW50ZXInLCBbJyRldmVudCddKVxyXG4gIG9uRHJhZ0VudGVyKCRldmVudCkge1xyXG4gICAgaWYgKCF0aGlzLmFsbG93RHJvcCgkZXZlbnQpKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy5vbkRyYWdFbnRlckNhbGxiYWNrLmVtaXQoe2V2ZW50OiAkZXZlbnQsIGVsZW1lbnQ6IHRoaXMudHJlZURyYWdnZWRFbGVtZW50LmdldCgpfSk7XHJcbiAgfVxyXG5cclxuICAvLyBASG9zdExpc3RlbmVyKCdkcmFnbGVhdmUnLCBbJyRldmVudCddKVxyXG4gIG9uRHJhZ0xlYXZlKCRldmVudCkge1xyXG4gICAgaWYgKCF0aGlzLmFsbG93RHJvcCgkZXZlbnQpKSByZXR1cm4gdGhpcy5yZW1vdmVEaXNhYmxlZENsYXNzKCk7XHJcblxyXG4gICAgdGhpcy5vbkRyYWdMZWF2ZUNhbGxiYWNrLmVtaXQoe2V2ZW50OiAkZXZlbnQsIGVsZW1lbnQ6IHRoaXMudHJlZURyYWdnZWRFbGVtZW50LmdldCgpfSk7XHJcblxyXG4gICAgdGhpcy5yZW1vdmVDbGFzcygpO1xyXG4gIH1cclxuXHJcbiAgLy8gQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pXHJcbiAgb25Ecm9wKCRldmVudCkge1xyXG4gICAgaWYgKCF0aGlzLmFsbG93RHJvcCgkZXZlbnQpKSByZXR1cm47XHJcblxyXG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLm9uRHJvcENhbGxiYWNrLmVtaXQoe2V2ZW50OiAkZXZlbnQsIGVsZW1lbnQ6IHRoaXMudHJlZURyYWdnZWRFbGVtZW50LmdldCgpfSk7XHJcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCk7XHJcbiAgICB0aGlzLnRyZWVEcmFnZ2VkRWxlbWVudC5zZXQobnVsbCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZENsYXNzKCkge1xyXG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnZHJvcGFibGUnLCAneWVzJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbW92ZUNsYXNzKCkge1xyXG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnZHJvcGFibGUnLCAnLS0tJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZERpc2FibGVkQ2xhc3MoKSB7XHJcbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkcm9wYWJsZScsICdub3QnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVtb3ZlRGlzYWJsZWRDbGFzcygpIHtcclxuICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2Ryb3BhYmxlJywgJy0tLScpO1xyXG4gIH1cclxuc3RhdGljIGRlY29yYXRvcnM6IERlY29yYXRvckludm9jYXRpb25bXSA9IFtcbnsgdHlwZTogRGlyZWN0aXZlLCBhcmdzOiBbe1xyXG4gIHNlbGVjdG9yOiAnW3RyZWVEcm9wXSdcclxufSwgXSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuc3RhdGljIGN0b3JQYXJhbWV0ZXJzOiAoKSA9PiAoe3R5cGU6IGFueSwgZGVjb3JhdG9ycz86IERlY29yYXRvckludm9jYXRpb25bXX18bnVsbClbXSA9ICgpID0+IFtcbnt0eXBlOiBOZ1pvbmUsIH0sXG57dHlwZTogRWxlbWVudFJlZiwgfSxcbnt0eXBlOiBUcmVlRHJhZ2dlZEVsZW1lbnQsIH0sXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbidvbkRyb3BDYWxsYmFjayc6IFt7IHR5cGU6IE91dHB1dCwgYXJnczogWyd0cmVlRHJvcCcsIF0gfSxdLFxuJ29uRHJhZ092ZXJDYWxsYmFjayc6IFt7IHR5cGU6IE91dHB1dCwgYXJnczogWyd0cmVlRHJvcERyYWdPdmVyJywgXSB9LF0sXG4nb25EcmFnTGVhdmVDYWxsYmFjayc6IFt7IHR5cGU6IE91dHB1dCwgYXJnczogWyd0cmVlRHJvcERyYWdMZWF2ZScsIF0gfSxdLFxuJ29uRHJhZ0VudGVyQ2FsbGJhY2snOiBbeyB0eXBlOiBPdXRwdXQsIGFyZ3M6IFsndHJlZURyb3BEcmFnRW50ZXInLCBdIH0sXSxcbid0cmVlQWxsb3dEcm9wJzogW3sgdHlwZTogSW5wdXQgfSxdLFxufTtcbn1cclxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=