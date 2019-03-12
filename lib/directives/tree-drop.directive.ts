import { Directive, Output, Input, EventEmitter, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';

const DRAG_OVER_CLASS = 'is-dragging-over';
const DRAG_DISABLED_CLASS = 'is-dragging-over-disabled';

@Directive({
  selector: '[treeDrop]'
})
export class TreeDropDirective {
  @Output('treeDrop') onDropCallback = new EventEmitter();
  @Output('treeDropDragOver') onDragOverCallback = new EventEmitter();
  @Output('treeDropDragLeave') onDragLeaveCallback = new EventEmitter();
  @Output('treeDropDragEnter') onDragEnterCallback = new EventEmitter();

  private _allowDrop = (element, $event) => true;
  @Input() set treeAllowDrop(allowDrop) {
    if (allowDrop instanceof Function) {
      this._allowDrop = allowDrop;
    }
    else this._allowDrop = (element, $event) => allowDrop;
  }
  allowDrop($event) {
    return this._allowDrop(this.treeDraggedElement.get(), $event);
  }

  constructor(private el: ElementRef, private renderer: Renderer2, private treeDraggedElement: TreeDraggedElement) {
  }

  @HostListener('dragover', ['$event']) onDragOver($event) {
    if (!this.allowDrop($event)) return this.addDisabledClass();

    this.onDragOverCallback.emit({event: $event, element: this.treeDraggedElement.get()});

    $event.preventDefault();
    this.addClass();
  }

  @HostListener('dragenter', ['$event']) onDragEnter($event) {
    if (!this.allowDrop($event)) return;

    this.onDragEnterCallback.emit({event: $event, element: this.treeDraggedElement.get()});
  }

  @HostListener('dragleave', ['$event']) onDragLeave($event) {
    if (!this.allowDrop($event)) return this.removeDisabledClass();

    this.onDragLeaveCallback.emit({event: $event, element: this.treeDraggedElement.get()});

    this.removeClass();
  }

  @HostListener('drop', ['$event']) onDrop($event) {
    if (!this.allowDrop($event)) return;

    $event.preventDefault();
    this.onDropCallback.emit({event: $event, element: this.treeDraggedElement.get()});
    this.removeClass();
    this.treeDraggedElement.set(null);
  }

  private addClass() {
    this.renderer.addClass(this.el.nativeElement, DRAG_OVER_CLASS);
  }

  private removeClass() {
    this.renderer.removeClass(this.el.nativeElement, DRAG_OVER_CLASS);
  }

  private addDisabledClass() {
    this.renderer.addClass(this.el.nativeElement, DRAG_DISABLED_CLASS);
  }

  private removeDisabledClass() {
    this.renderer.removeClass(this.el.nativeElement, DRAG_DISABLED_CLASS);
  }
}
