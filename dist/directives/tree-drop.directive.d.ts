import { EventEmitter, ElementRef, AfterViewInit, NgZone, OnDestroy } from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
export declare class TreeDropDirective implements AfterViewInit, OnDestroy {
    private ngZone;
    private el;
    private treeDraggedElement;
    onDropCallback: EventEmitter<{}>;
    onDragOverCallback: EventEmitter<{}>;
    onDragLeaveCallback: EventEmitter<{}>;
    onDragEnterCallback: EventEmitter<{}>;
    private _allowDrop;
    treeAllowDrop: any;
    allowDrop($event: any): boolean;
    constructor(ngZone: NgZone, el: ElementRef, treeDraggedElement: TreeDraggedElement);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onDragOver($event: any): void;
    onDragEnter($event: any): void;
    onDragLeave($event: any): void;
    onDrop($event: any): void;
    private addClass;
    private removeClass;
    private addDisabledClass;
    private removeDisabledClass;
}
