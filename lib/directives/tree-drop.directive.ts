import { Directive, Output, Input, EventEmitter, HostListener, ElementRef, AfterViewInit, NgZone, OnDestroy } from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';

const DRAG_OVER_CLASS = 'is-dragging-over';
const DRAG_DISABLED_CLASS = 'is-dragging-over-disabled';

@Directive({
  selector: '[treeDrop]'
})
export class TreeDropDirective implements AfterViewInit, OnDestroy {
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

  constructor(private ngZone: NgZone, private el: ElementRef, private treeDraggedElement: TreeDraggedElement) {
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.el.nativeElement.addEventListener('dragover', evt => this.onDragOver(evt));
      this.el.nativeElement.addEventListener('dragenter', evt => this.onDragEnter(evt));
      this.el.nativeElement.addEventListener('dragleave', evt => this.onDragLeave(evt));
      this.el.nativeElement.addEventListener('drop', evt => this.onDrop(evt));
    });
  }

  ngOnDestroy() {
    this.el.nativeElement.removeEventListener('dragover', evt => this.onDragOver(evt));
    this.el.nativeElement.removeEventListener('dragenter', evt => this.onDragEnter(evt));
    this.el.nativeElement.removeEventListener('dragleave', evt => this.onDragLeave(evt));
    this.el.nativeElement.removeEventListener('drop', evt => this.onDrop(evt));
  }

  // @HostListener('dragover', ['$event'])
  onDragOver($event) {
    if (!this.allowDrop($event)) return this.addDisabledClass();

    this.onDragOverCallback.emit({event: $event, element: this.treeDraggedElement.get()});

    $event.preventDefault();
    this.addClass();
  }

  // @HostListener('dragenter', ['$event'])
  onDragEnter($event) {
    if (!this.allowDrop($event)) return;

    this.onDragEnterCallback.emit({event: $event, element: this.treeDraggedElement.get()});
  }

  // @HostListener('dragleave', ['$event'])
  onDragLeave($event) {
    if (!this.allowDrop($event)) return this.removeDisabledClass();

    this.onDragLeaveCallback.emit({event: $event, element: this.treeDraggedElement.get()});

    this.removeClass();
  }

  // @HostListener('drop', ['$event'])
  onDrop($event) {
    if (!this.allowDrop($event)) return;

    $event.preventDefault();
    this.onDropCallback.emit({event: $event, element: this.treeDraggedElement.get()});
    this.removeClass();
    this.treeDraggedElement.set(null);
  }

  private addClass() {
    this.el.nativeElement.setAttribute('dropable', 'yes');
  }

  private removeClass() {
    this.el.nativeElement.setAttribute('dropable', '---');
  }

  private addDisabledClass() {
    this.el.nativeElement.setAttribute('dropable', 'not');
  }

  private removeDisabledClass() {
    this.el.nativeElement.setAttribute('dropable', '---');
  }
}
