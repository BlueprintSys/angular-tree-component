import { Component, Input, Output, EventEmitter, Renderer, ContentChild, HostListener, ViewChild } from '@angular/core';
import { TreeModel } from '../models/tree.model';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
import includes from 'lodash/includes';
import pick from 'lodash/pick';
var TreeComponent = /** @class */ (function () {
    function TreeComponent(treeModel, treeDraggedElement, renderer) {
        var _this = this;
        this.treeModel = treeModel;
        this.treeDraggedElement = treeDraggedElement;
        this.renderer = renderer;
        treeModel.eventNames.forEach(function (name) { return _this[name] = new EventEmitter(); });
        treeModel.subscribeToState(function (state) { return _this.stateChange.emit(state); });
    }
    Object.defineProperty(TreeComponent.prototype, "nodes", {
        // Will be handled in ngOnChanges
        set: function (nodes) { },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeComponent.prototype, "options", {
        set: function (options) { },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeComponent.prototype, "focused", {
        set: function (value) {
            this.treeModel.setFocus(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeComponent.prototype, "state", {
        set: function (state) {
            this.treeModel.setState(state);
        },
        enumerable: true,
        configurable: true
    });
    TreeComponent.prototype.onKeydown = function ($event) {
        if (!this.treeModel.isFocused)
            return;
        if (includes(['input', 'textarea'], document.activeElement.tagName.toLowerCase()))
            return;
        var focusedNode = this.treeModel.getFocusedNode();
        this.treeModel.performKeyAction(focusedNode, $event);
    };
    TreeComponent.prototype.onMousedown = function ($event) {
        var insideClick = this.renderer.invokeElementMethod($event.target, 'closest', ['Tree']);
        if (!insideClick) {
            this.treeModel.setFocus(false);
        }
    };
    TreeComponent.prototype.ngOnChanges = function (changes) {
        this.treeModel.setData({
            options: changes.options && changes.options.currentValue,
            nodes: changes.nodes && changes.nodes.currentValue,
            events: pick(this, this.treeModel.eventNames)
        });
    };
    TreeComponent.prototype.sizeChanged = function () {
        this.viewportComponent.setViewport();
    };
    TreeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'Tree, tree-root',
                    providers: [TreeModel],
                    styles: [],
                    template: "\n    <tree-viewport #viewport>\n      <div\n        class=\"angular-tree-component\"\n        [class.node-dragging]=\"treeDraggedElement.isDragging()\"\n        [class.angular-tree-component-rtl]=\"treeModel.options.rtl\">\n        <tree-node-collection\n          *ngIf=\"treeModel.roots\"\n          [nodes]=\"treeModel.roots\"\n          [treeModel]=\"treeModel\"\n          [templates]=\"{\n            loadingTemplate: loadingTemplate,\n            treeNodeTemplate: treeNodeTemplate,\n            treeNodeWrapperTemplate: treeNodeWrapperTemplate,\n            treeNodeFullTemplate: treeNodeFullTemplate\n          }\">\n        </tree-node-collection>\n        <tree-node-drop-slot\n          class=\"empty-tree-drop-slot\"\n          *ngIf=\"treeModel.isEmptyTree()\"\n          [dropIndex]=\"0\"\n          [node]=\"treeModel.virtualRoot\">\n        </tree-node-drop-slot>\n      </div>\n    </tree-viewport>\n  "
                },] },
    ];
    /** @nocollapse */
    TreeComponent.ctorParameters = function () { return [
        { type: TreeModel, },
        { type: TreeDraggedElement, },
        { type: Renderer, },
    ]; };
    TreeComponent.propDecorators = {
        'loadingTemplate': [{ type: ContentChild, args: ['loadingTemplate',] },],
        'treeNodeTemplate': [{ type: ContentChild, args: ['treeNodeTemplate',] },],
        'treeNodeWrapperTemplate': [{ type: ContentChild, args: ['treeNodeWrapperTemplate',] },],
        'treeNodeFullTemplate': [{ type: ContentChild, args: ['treeNodeFullTemplate',] },],
        'viewportComponent': [{ type: ViewChild, args: ['viewport',] },],
        'nodes': [{ type: Input },],
        'options': [{ type: Input },],
        'focused': [{ type: Input },],
        'state': [{ type: Input },],
        'toggleExpanded': [{ type: Output },],
        'activate': [{ type: Output },],
        'deactivate': [{ type: Output },],
        'select': [{ type: Output },],
        'deselect': [{ type: Output },],
        'focus': [{ type: Output },],
        'blur': [{ type: Output },],
        'updateData': [{ type: Output },],
        'initialized': [{ type: Output },],
        'moveNode': [{ type: Output },],
        'copyNode': [{ type: Output },],
        'loadNodeChildren': [{ type: Output },],
        'changeFilter': [{ type: Output },],
        'event': [{ type: Output },],
        'stateChange': [{ type: Output },],
        'onKeydown': [{ type: HostListener, args: ['body: keydown', ['$event'],] },],
        'onMousedown': [{ type: HostListener, args: ['body: mousedown', ['$event'],] },],
    };
    return TreeComponent;
}());
export { TreeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3RyZWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsS0FBQSxFQUFPLE1BQUEsRUFBbUIsWUFBQSxFQUFjLFFBQUEsRUFDaEMsWUFBQSxFQUEyQixZQUFBLEVBQWMsU0FBQSxFQUM3RCxNQUFNLGVBQUEsQ0FBZ0I7QUFDdkIsT0FBTyxFQUFFLFNBQUEsRUFBVSxNQUFPLHNCQUFBLENBQXVCO0FBRWpELE9BQU8sRUFBRSxrQkFBQSxFQUFtQixNQUFPLHNDQUFBLENBQXVDO0FBSTFFLE9BQU8sUUFBQSxNQUFjLGlCQUFBLENBQWtCO0FBQ3ZDLE9BQU8sSUFBQSxNQUFVLGFBQUEsQ0FBYztBQUcvQjtJQXNDRSx1QkFDUyxTQUFvQixFQUNwQixrQkFBc0MsRUFDckMsUUFBa0I7UUFINUIsaUJBT0M7UUFOUSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDckMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUV4QixTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLFlBQVksRUFBRSxFQUEvQixDQUErQixDQUFDLENBQUM7UUFDeEUsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQTVCLENBQTRCLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBbENBLHNCQUFJLGdDQUFLO1FBRFYsaUNBQWlDO2FBQ2hDLFVBQVUsS0FBWSxJQUFJLENBQUM7OztPQUFBO0lBQUEsQ0FBQztJQUM1QixzQkFBSSxrQ0FBTzthQUFYLFVBQVksT0FBb0IsSUFBSSxDQUFDOzs7T0FBQTtJQUFBLENBQUM7SUFFdEMsc0JBQUksa0NBQU87YUFBWCxVQUFZLEtBQWM7WUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQzs7O09BQUE7SUFFQSxzQkFBSSxnQ0FBSzthQUFULFVBQVUsS0FBSztZQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLENBQUM7OztPQUFBO0lBNEJELGlDQUFTLEdBQVQsVUFBVSxNQUFNO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUztZQUFFLE9BQU87UUFDdEMsSUFBSSxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQzlCLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQUUsT0FBTztRQUUxRCxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXBELElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFHRCxtQ0FBVyxHQUFYLFVBQVksTUFBTTtRQUNoQixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUUxRixJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQztJQUVELG1DQUFXLEdBQVgsVUFBWSxPQUFPO1FBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1lBQ3JCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWTtZQUN4RCxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVk7WUFDbEQsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7U0FDOUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG1DQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUNJLHdCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDO29CQUN0QixNQUFNLEVBQUUsRUFBRTtvQkFDVixRQUFRLEVBQUUsMjVCQXlCVDtpQkFDRixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsNEJBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLFNBQVMsR0FBRztRQUNuQixFQUFDLElBQUksRUFBRSxrQkFBa0IsR0FBRztRQUM1QixFQUFDLElBQUksRUFBRSxRQUFRLEdBQUc7S0FDakIsRUFKNkYsQ0FJN0YsQ0FBQztJQUNLLDRCQUFjLEdBQTJDO1FBQ2hFLGlCQUFpQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLGlCQUFpQixFQUFHLEVBQUUsRUFBRTtRQUN6RSxrQkFBa0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRyxFQUFFLEVBQUU7UUFDM0UseUJBQXlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMseUJBQXlCLEVBQUcsRUFBRSxFQUFFO1FBQ3pGLHNCQUFzQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLHNCQUFzQixFQUFHLEVBQUUsRUFBRTtRQUNuRixtQkFBbUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxVQUFVLEVBQUcsRUFBRSxFQUFFO1FBQ2pFLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQzNCLFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQzdCLFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQzdCLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQzNCLGdCQUFnQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckMsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDL0IsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDakMsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDN0IsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDL0IsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDNUIsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDM0IsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDakMsYUFBYSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbEMsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDL0IsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDL0Isa0JBQWtCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUN2QyxjQUFjLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNuQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUM1QixhQUFhLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNsQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUcsRUFBRSxFQUFFO1FBQzdFLGFBQWEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFHLEVBQUUsRUFBRTtLQUNoRixDQUFDO0lBQ0Ysb0JBQUM7Q0FqSkQsQUFpSkMsSUFBQTtTQWpKWSxhQUFhIiwiZmlsZSI6InRyZWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBPbkNoYW5nZXMsIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb24sIENvbnRlbnRDaGlsZCwgVGVtcGxhdGVSZWYsIEhvc3RMaXN0ZW5lciwgVmlld0NoaWxkXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyZWVNb2RlbCB9IGZyb20gJy4uL21vZGVscy90cmVlLm1vZGVsJztcclxuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcclxuaW1wb3J0IHsgVHJlZURyYWdnZWRFbGVtZW50IH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtZHJhZ2dlZC1lbGVtZW50Lm1vZGVsJztcclxuaW1wb3J0IHsgVHJlZU9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1vcHRpb25zLm1vZGVsJztcclxuaW1wb3J0IHsgVHJlZVZpZXdwb3J0Q29tcG9uZW50IH0gZnJvbSAnLi90cmVlLXZpZXdwb3J0LmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgaW5jbHVkZXMgZnJvbSAnbG9kYXNoL2luY2x1ZGVzJztcclxuaW1wb3J0IHBpY2sgZnJvbSAnbG9kYXNoL3BpY2snO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBUcmVlQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBfbm9kZXM6IGFueVtdO1xyXG4gIF9vcHRpb25zOiBUcmVlT3B0aW9ucztcclxuXHJcbiAgIGxvYWRpbmdUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgdHJlZU5vZGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgdHJlZU5vZGVXcmFwcGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgIHRyZWVOb2RlRnVsbFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICB2aWV3cG9ydENvbXBvbmVudDogVHJlZVZpZXdwb3J0Q29tcG9uZW50O1xyXG5cclxuICAvLyBXaWxsIGJlIGhhbmRsZWQgaW4gbmdPbkNoYW5nZXNcclxuICAgc2V0IG5vZGVzKG5vZGVzOiBhbnlbXSkgeyB9O1xyXG4gICBzZXQgb3B0aW9ucyhvcHRpb25zOiBUcmVlT3B0aW9ucykgeyB9O1xyXG5cclxuICAgc2V0IGZvY3VzZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMudHJlZU1vZGVsLnNldEZvY3VzKHZhbHVlKTtcclxuICB9XHJcblxyXG4gICBzZXQgc3RhdGUoc3RhdGUpIHtcclxuICAgIHRoaXMudHJlZU1vZGVsLnNldFN0YXRlKHN0YXRlKTtcclxuICB9XHJcblxyXG4gICB0b2dnbGVFeHBhbmRlZDtcclxuICAgYWN0aXZhdGU7XHJcbiAgIGRlYWN0aXZhdGU7XHJcbiAgIHNlbGVjdDtcclxuICAgZGVzZWxlY3Q7XHJcbiAgIGZvY3VzO1xyXG4gICBibHVyO1xyXG4gICB1cGRhdGVEYXRhO1xyXG4gICBpbml0aWFsaXplZDtcclxuICAgbW92ZU5vZGU7XHJcbiAgIGNvcHlOb2RlO1xyXG4gICBsb2FkTm9kZUNoaWxkcmVuO1xyXG4gICBjaGFuZ2VGaWx0ZXI7XHJcbiAgIGV2ZW50O1xyXG4gICBzdGF0ZUNoYW5nZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgdHJlZU1vZGVsOiBUcmVlTW9kZWwsXHJcbiAgICBwdWJsaWMgdHJlZURyYWdnZWRFbGVtZW50OiBUcmVlRHJhZ2dlZEVsZW1lbnQsXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcikge1xyXG5cclxuICAgICAgdHJlZU1vZGVsLmV2ZW50TmFtZXMuZm9yRWFjaCgobmFtZSkgPT4gdGhpc1tuYW1lXSA9IG5ldyBFdmVudEVtaXR0ZXIoKSk7XHJcbiAgICAgIHRyZWVNb2RlbC5zdWJzY3JpYmVUb1N0YXRlKChzdGF0ZSkgPT4gdGhpcy5zdGF0ZUNoYW5nZS5lbWl0KHN0YXRlKSk7XHJcbiAgfVxyXG5cclxuICBcclxuICBvbktleWRvd24oJGV2ZW50KSB7XHJcbiAgICBpZiAoIXRoaXMudHJlZU1vZGVsLmlzRm9jdXNlZCkgcmV0dXJuO1xyXG4gICAgaWYgKGluY2x1ZGVzKFsnaW5wdXQnLCAndGV4dGFyZWEnXSxcclxuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSkpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBmb2N1c2VkTm9kZSA9IHRoaXMudHJlZU1vZGVsLmdldEZvY3VzZWROb2RlKCk7XHJcblxyXG4gICAgdGhpcy50cmVlTW9kZWwucGVyZm9ybUtleUFjdGlvbihmb2N1c2VkTm9kZSwgJGV2ZW50KTtcclxuICB9XHJcblxyXG4gIFxyXG4gIG9uTW91c2Vkb3duKCRldmVudCkge1xyXG4gICAgY29uc3QgaW5zaWRlQ2xpY2sgPSB0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QoJGV2ZW50LnRhcmdldCwgJ2Nsb3Nlc3QnLCBbJ1RyZWUnXSk7XHJcblxyXG4gICAgaWYgKCFpbnNpZGVDbGljaykge1xyXG4gICAgICB0aGlzLnRyZWVNb2RlbC5zZXRGb2N1cyhmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzKSB7XHJcbiAgICB0aGlzLnRyZWVNb2RlbC5zZXREYXRhKHtcclxuICAgICAgb3B0aW9uczogY2hhbmdlcy5vcHRpb25zICYmIGNoYW5nZXMub3B0aW9ucy5jdXJyZW50VmFsdWUsXHJcbiAgICAgIG5vZGVzOiBjaGFuZ2VzLm5vZGVzICYmIGNoYW5nZXMubm9kZXMuY3VycmVudFZhbHVlLFxyXG4gICAgICBldmVudHM6IHBpY2sodGhpcywgdGhpcy50cmVlTW9kZWwuZXZlbnROYW1lcylcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2l6ZUNoYW5nZWQoKSB7XHJcbiAgICB0aGlzLnZpZXdwb3J0Q29tcG9uZW50LnNldFZpZXdwb3J0KCk7XHJcbiAgfVxyXG5zdGF0aWMgZGVjb3JhdG9yczogRGVjb3JhdG9ySW52b2NhdGlvbltdID0gW1xueyB0eXBlOiBDb21wb25lbnQsIGFyZ3M6IFt7XHJcbiAgc2VsZWN0b3I6ICdUcmVlLCB0cmVlLXJvb3QnLFxyXG4gIHByb3ZpZGVyczogW1RyZWVNb2RlbF0sXHJcbiAgc3R5bGVzOiBbXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHRyZWUtdmlld3BvcnQgI3ZpZXdwb3J0PlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3M9XCJhbmd1bGFyLXRyZWUtY29tcG9uZW50XCJcclxuICAgICAgICBbY2xhc3Mubm9kZS1kcmFnZ2luZ109XCJ0cmVlRHJhZ2dlZEVsZW1lbnQuaXNEcmFnZ2luZygpXCJcclxuICAgICAgICBbY2xhc3MuYW5ndWxhci10cmVlLWNvbXBvbmVudC1ydGxdPVwidHJlZU1vZGVsLm9wdGlvbnMucnRsXCI+XHJcbiAgICAgICAgPHRyZWUtbm9kZS1jb2xsZWN0aW9uXHJcbiAgICAgICAgICAqbmdJZj1cInRyZWVNb2RlbC5yb290c1wiXHJcbiAgICAgICAgICBbbm9kZXNdPVwidHJlZU1vZGVsLnJvb3RzXCJcclxuICAgICAgICAgIFt0cmVlTW9kZWxdPVwidHJlZU1vZGVsXCJcclxuICAgICAgICAgIFt0ZW1wbGF0ZXNdPVwie1xyXG4gICAgICAgICAgICBsb2FkaW5nVGVtcGxhdGU6IGxvYWRpbmdUZW1wbGF0ZSxcclxuICAgICAgICAgICAgdHJlZU5vZGVUZW1wbGF0ZTogdHJlZU5vZGVUZW1wbGF0ZSxcclxuICAgICAgICAgICAgdHJlZU5vZGVXcmFwcGVyVGVtcGxhdGU6IHRyZWVOb2RlV3JhcHBlclRlbXBsYXRlLFxyXG4gICAgICAgICAgICB0cmVlTm9kZUZ1bGxUZW1wbGF0ZTogdHJlZU5vZGVGdWxsVGVtcGxhdGVcclxuICAgICAgICAgIH1cIj5cclxuICAgICAgICA8L3RyZWUtbm9kZS1jb2xsZWN0aW9uPlxyXG4gICAgICAgIDx0cmVlLW5vZGUtZHJvcC1zbG90XHJcbiAgICAgICAgICBjbGFzcz1cImVtcHR5LXRyZWUtZHJvcC1zbG90XCJcclxuICAgICAgICAgICpuZ0lmPVwidHJlZU1vZGVsLmlzRW1wdHlUcmVlKClcIlxyXG4gICAgICAgICAgW2Ryb3BJbmRleF09XCIwXCJcclxuICAgICAgICAgIFtub2RlXT1cInRyZWVNb2RlbC52aXJ0dWFsUm9vdFwiPlxyXG4gICAgICAgIDwvdHJlZS1ub2RlLWRyb3Atc2xvdD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L3RyZWUtdmlld3BvcnQ+XHJcbiAgYFxyXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICgpID0+ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gKCkgPT4gW1xue3R5cGU6IFRyZWVNb2RlbCwgfSxcbnt0eXBlOiBUcmVlRHJhZ2dlZEVsZW1lbnQsIH0sXG57dHlwZTogUmVuZGVyZXIsIH0sXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbidsb2FkaW5nVGVtcGxhdGUnOiBbeyB0eXBlOiBDb250ZW50Q2hpbGQsIGFyZ3M6IFsnbG9hZGluZ1RlbXBsYXRlJywgXSB9LF0sXG4ndHJlZU5vZGVUZW1wbGF0ZSc6IFt7IHR5cGU6IENvbnRlbnRDaGlsZCwgYXJnczogWyd0cmVlTm9kZVRlbXBsYXRlJywgXSB9LF0sXG4ndHJlZU5vZGVXcmFwcGVyVGVtcGxhdGUnOiBbeyB0eXBlOiBDb250ZW50Q2hpbGQsIGFyZ3M6IFsndHJlZU5vZGVXcmFwcGVyVGVtcGxhdGUnLCBdIH0sXSxcbid0cmVlTm9kZUZ1bGxUZW1wbGF0ZSc6IFt7IHR5cGU6IENvbnRlbnRDaGlsZCwgYXJnczogWyd0cmVlTm9kZUZ1bGxUZW1wbGF0ZScsIF0gfSxdLFxuJ3ZpZXdwb3J0Q29tcG9uZW50JzogW3sgdHlwZTogVmlld0NoaWxkLCBhcmdzOiBbJ3ZpZXdwb3J0JywgXSB9LF0sXG4nbm9kZXMnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4nb3B0aW9ucyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbidmb2N1c2VkJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ3N0YXRlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ3RvZ2dsZUV4cGFuZGVkJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidhY3RpdmF0ZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nZGVhY3RpdmF0ZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nc2VsZWN0JzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidkZXNlbGVjdCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nZm9jdXMnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ2JsdXInOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ3VwZGF0ZURhdGEnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ2luaXRpYWxpemVkJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidtb3ZlTm9kZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nY29weU5vZGUnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ2xvYWROb2RlQ2hpbGRyZW4nOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ2NoYW5nZUZpbHRlcic6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nZXZlbnQnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ3N0YXRlQ2hhbmdlJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidvbktleWRvd24nOiBbeyB0eXBlOiBIb3N0TGlzdGVuZXIsIGFyZ3M6IFsnYm9keToga2V5ZG93bicsIFsnJGV2ZW50J10sIF0gfSxdLFxuJ29uTW91c2Vkb3duJzogW3sgdHlwZTogSG9zdExpc3RlbmVyLCBhcmdzOiBbJ2JvZHk6IG1vdXNlZG93bicsIFsnJGV2ZW50J10sIF0gfSxdLFxufTtcbn1cclxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=