var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { observable, computed, reaction, action } from 'mobx';
import { TREE_EVENTS } from '../constants/events';
import first from 'lodash/first';
import last from 'lodash/last';
import some from 'lodash/some';
import every from 'lodash/every';
var TreeNode = /** @class */ (function () {
    function TreeNode(data, parent, treeModel, index) {
        var _this = this;
        this.data = data;
        this.parent = parent;
        this.treeModel = treeModel;
        this.position = 0;
        this.allowDrop = function (element, $event) {
            return _this.options.allowDrop(element, { parent: _this, index: 0 }, $event);
        };
        if (this.id === undefined || this.id === null) {
            this.id = uuid();
        } // Make sure there's a unique id without overriding existing ids to work with immutable data structures
        this.index = index;
        if (this.getField('children')) {
            this._initChildren();
        }
        this.autoLoadChildren();
    }
    Object.defineProperty(TreeNode.prototype, "isHidden", {
        get: function () { return this.treeModel.isHidden(this); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeNode.prototype, "isExpanded", {
        get: function () { return this.treeModel.isExpanded(this); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeNode.prototype, "isActive", {
        get: function () { return this.treeModel.isActive(this); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeNode.prototype, "isFocused", {
        get: function () { return this.treeModel.isNodeFocused(this); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeNode.prototype, "isSelected", {
        get: function () {
            if (this.isLeaf) {
                return this.treeModel.isSelected(this);
            }
            else {
                return some(this.children, function (node) { return node.isSelected; });
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeNode.prototype, "isAllSelected", {
        get: function () {
            if (this.isLeaf) {
                return this.isSelected;
            }
            else {
                return every(this.children, function (node) { return node.isAllSelected; });
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeNode.prototype, "isPartiallySelected", {
        get: function () {
            return this.isSelected && !this.isAllSelected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "level", {
        get: function () {
            return this.parent ? this.parent.level + 1 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "path", {
        get: function () {
            return this.parent ? this.parent.path.concat([this.id]) : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "elementRef", {
        get: function () {
            throw "Element Ref is no longer supported since introducing virtual scroll\n\n      You may use a template to obtain a reference to the element";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "originalNode", {
        get: function () { return this._originalNode; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeNode.prototype, "hasChildren", {
        // helper get functions:
        get: function () {
            return !!(this.getField('hasChildren') || (this.children && this.children.length > 0));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "isCollapsed", {
        get: function () { return !this.isExpanded; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "isLeaf", {
        get: function () { return !this.hasChildren; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "isRoot", {
        get: function () { return this.parent.data.virtual; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "realParent", {
        get: function () { return this.isRoot ? null : this.parent; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "options", {
        // proxy functions:
        get: function () { return this.treeModel.options; },
        enumerable: true,
        configurable: true
    });
    TreeNode.prototype.fireEvent = function (event) { this.treeModel.fireEvent(event); };
    Object.defineProperty(TreeNode.prototype, "displayField", {
        // field accessors:
        get: function () {
            return this.getField('display');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "id", {
        get: function () {
            return this.getField('id');
        },
        set: function (value) {
            this.setField('id', value);
        },
        enumerable: true,
        configurable: true
    });
    TreeNode.prototype.getField = function (key) {
        return this.data[this.options[key + "Field"]];
    };
    TreeNode.prototype.setField = function (key, value) {
        this.data[this.options[key + "Field"]] = value;
    };
    // traversing:
    TreeNode.prototype._findAdjacentSibling = function (steps, skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        var siblings = this._getParentsChildren(skipHidden);
        var index = siblings.indexOf(this);
        return siblings.length > index + steps ? siblings[index + steps] : null;
    };
    TreeNode.prototype.findNextSibling = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        return this._findAdjacentSibling(+1, skipHidden);
    };
    TreeNode.prototype.findPreviousSibling = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        return this._findAdjacentSibling(-1, skipHidden);
    };
    TreeNode.prototype.getVisibleChildren = function () {
        return this.visibleChildren;
    };
    Object.defineProperty(TreeNode.prototype, "visibleChildren", {
        get: function () {
            return (this.children || []).filter(function (node) { return !node.isHidden; });
        },
        enumerable: true,
        configurable: true
    });
    TreeNode.prototype.getFirstChild = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        var children = skipHidden ? this.visibleChildren : this.children;
        return first(children || []);
    };
    TreeNode.prototype.getLastChild = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        var children = skipHidden ? this.visibleChildren : this.children;
        return last(children || []);
    };
    TreeNode.prototype.findNextNode = function (goInside, skipHidden) {
        if (goInside === void 0) { goInside = true; }
        if (skipHidden === void 0) { skipHidden = false; }
        return goInside && this.isExpanded && this.getFirstChild(skipHidden) ||
            this.findNextSibling(skipHidden) ||
            this.parent && this.parent.findNextNode(false, skipHidden);
    };
    TreeNode.prototype.findPreviousNode = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        var previousSibling = this.findPreviousSibling(skipHidden);
        if (!previousSibling) {
            return this.realParent;
        }
        return previousSibling._getLastOpenDescendant(skipHidden);
    };
    TreeNode.prototype._getLastOpenDescendant = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        var lastChild = this.getLastChild(skipHidden);
        return (this.isCollapsed || !lastChild)
            ? this
            : lastChild._getLastOpenDescendant(skipHidden);
    };
    TreeNode.prototype._getParentsChildren = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        var children = this.parent &&
            (skipHidden ? this.parent.getVisibleChildren() : this.parent.children);
        return children || [];
    };
    TreeNode.prototype.getIndexInParent = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        return this._getParentsChildren(skipHidden).indexOf(this);
    };
    TreeNode.prototype.isDescendantOf = function (node) {
        if (this === node)
            return true;
        else
            return this.parent && this.parent.isDescendantOf(node);
    };
    TreeNode.prototype.getNodePadding = function () {
        return this.options.levelPadding * (this.level - 1) + 'px';
    };
    TreeNode.prototype.getClass = function () {
        return [this.options.nodeClass(this), "tree-node-level-" + this.level].join(' ');
    };
    TreeNode.prototype.onDrop = function ($event) {
        this.mouseAction('drop', $event.event, {
            from: $event.element,
            to: { parent: this, index: 0, dropOnNode: true }
        });
    };
    TreeNode.prototype.allowDrag = function () {
        return this.options.allowDrag(this);
    };
    // helper methods:
    TreeNode.prototype.loadNodeChildren = function () {
        var _this = this;
        if (!this.options.getChildren) {
            return Promise.resolve(); // Not getChildren method - for using redux
        }
        return Promise.resolve(this.options.getChildren(this))
            .then(function (children) {
            if (children) {
                _this.setField('children', children);
                _this._initChildren();
                _this.children.forEach(function (child) {
                    if (child.getField('isExpanded') && child.hasChildren) {
                        child.expand();
                    }
                });
            }
        }).then(function () {
            _this.fireEvent({
                eventName: TREE_EVENTS.loadNodeChildren,
                node: _this
            });
        });
    };
    TreeNode.prototype.expand = function () {
        if (!this.isExpanded) {
            this.toggleExpanded();
        }
        return this;
    };
    TreeNode.prototype.collapse = function () {
        if (this.isExpanded) {
            this.toggleExpanded();
        }
        return this;
    };
    TreeNode.prototype.doForAll = function (fn) {
        var _this = this;
        Promise.resolve(fn(this)).then(function () {
            if (_this.children) {
                _this.children.forEach(function (child) { return child.doForAll(fn); });
            }
        });
    };
    TreeNode.prototype.expandAll = function () {
        this.doForAll(function (node) { return node.expand(); });
    };
    TreeNode.prototype.collapseAll = function () {
        this.doForAll(function (node) { return node.collapse(); });
    };
    TreeNode.prototype.ensureVisible = function () {
        if (this.realParent) {
            this.realParent.expand();
            this.realParent.ensureVisible();
        }
        return this;
    };
    TreeNode.prototype.toggleExpanded = function () {
        this.setIsExpanded(!this.isExpanded);
        return this;
    };
    TreeNode.prototype.setIsExpanded = function (value) {
        if (this.hasChildren) {
            this.treeModel.setExpandedNode(this, value);
        }
        return this;
    };
    ;
    TreeNode.prototype.autoLoadChildren = function () {
        var _this = this;
        reaction(function () { return _this.isExpanded; }, function (isExpanded) {
            if (!_this.children && _this.hasChildren && isExpanded) {
                _this.loadNodeChildren();
            }
        }, { fireImmediately: true });
    };
    TreeNode.prototype.setIsActive = function (value, multi) {
        if (multi === void 0) { multi = false; }
        this.treeModel.setActiveNode(this, value, multi);
        if (value) {
            this.focus(this.options.scrollOnSelect);
        }
        return this;
    };
    TreeNode.prototype.setIsSelected = function (value) {
        if (this.isLeaf) {
            this.treeModel.setSelectedNode(this, value);
        }
        else {
            this.children.forEach(function (child) { return child.setIsSelected(value); });
        }
        return this;
    };
    TreeNode.prototype.toggleSelected = function () {
        this.setIsSelected(!this.isSelected);
        return this;
    };
    TreeNode.prototype.toggleActivated = function (multi) {
        if (multi === void 0) { multi = false; }
        this.setIsActive(!this.isActive, multi);
        return this;
    };
    TreeNode.prototype.setActiveAndVisible = function (multi) {
        if (multi === void 0) { multi = false; }
        this.setIsActive(true, multi)
            .ensureVisible();
        setTimeout(this.scrollIntoView.bind(this));
        return this;
    };
    TreeNode.prototype.scrollIntoView = function (force) {
        if (force === void 0) { force = false; }
        this.treeModel.virtualScroll.scrollIntoView(this, force);
    };
    TreeNode.prototype.focus = function (scroll) {
        if (scroll === void 0) { scroll = true; }
        var previousNode = this.treeModel.getFocusedNode();
        this.treeModel.setFocusedNode(this);
        if (scroll) {
            this.scrollIntoView();
        }
        if (previousNode) {
            this.fireEvent({ eventName: TREE_EVENTS.blur, node: previousNode });
        }
        this.fireEvent({ eventName: TREE_EVENTS.focus, node: this });
        return this;
    };
    TreeNode.prototype.blur = function () {
        var previousNode = this.treeModel.getFocusedNode();
        this.treeModel.setFocusedNode(null);
        if (previousNode) {
            this.fireEvent({ eventName: TREE_EVENTS.blur, node: this });
        }
        return this;
    };
    TreeNode.prototype.setIsHidden = function (value) {
        this.treeModel.setIsHidden(this, value);
    };
    TreeNode.prototype.hide = function () {
        this.setIsHidden(true);
    };
    TreeNode.prototype.show = function () {
        this.setIsHidden(false);
    };
    TreeNode.prototype.mouseAction = function (actionName, $event, data) {
        if (data === void 0) { data = null; }
        this.treeModel.setFocus(true);
        var actionMapping = this.options.actionMapping.mouse;
        var action = actionMapping[actionName];
        if (action) {
            action(this.treeModel, this, $event, data);
        }
    };
    TreeNode.prototype.getSelfHeight = function () {
        return this.options.nodeHeight(this);
    };
    TreeNode.prototype._initChildren = function () {
        var _this = this;
        this.children = this.getField('children')
            .map(function (c, index) { return new TreeNode(c, _this, _this.treeModel, index); });
    };
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], TreeNode.prototype, "isHidden", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], TreeNode.prototype, "isExpanded", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], TreeNode.prototype, "isActive", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], TreeNode.prototype, "isFocused", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], TreeNode.prototype, "isSelected", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], TreeNode.prototype, "isAllSelected", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], TreeNode.prototype, "isPartiallySelected", null);
    __decorate([
        observable,
        __metadata("design:type", Array)
    ], TreeNode.prototype, "children", void 0);
    __decorate([
        observable,
        __metadata("design:type", Number)
    ], TreeNode.prototype, "index", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], TreeNode.prototype, "position", void 0);
    __decorate([
        observable,
        __metadata("design:type", Number)
    ], TreeNode.prototype, "height", void 0);
    __decorate([
        computed,
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [])
    ], TreeNode.prototype, "level", null);
    __decorate([
        computed,
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [])
    ], TreeNode.prototype, "path", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], TreeNode.prototype, "visibleChildren", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TreeNode.prototype, "_initChildren", null);
    return TreeNode;
}());
export { TreeNode };
function uuid() {
    return Math.floor(Math.random() * 10000000000000);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBVyxNQUFNLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJdkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWxELE9BQU8sS0FBSyxNQUFNLGNBQWMsQ0FBQztBQUNqQyxPQUFPLElBQUksTUFBTSxhQUFhLENBQUM7QUFDL0IsT0FBTyxJQUFJLE1BQU0sYUFBYSxDQUFDO0FBQy9CLE9BQU8sS0FBSyxNQUFNLGNBQWMsQ0FBQztBQUVqQztJQTBDRSxrQkFBbUIsSUFBUyxFQUFTLE1BQWdCLEVBQVMsU0FBb0IsRUFBRSxLQUFhO1FBQWpHLGlCQVVDO1FBVmtCLFNBQUksR0FBSixJQUFJLENBQUs7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFVO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBVztRQWpCdEUsYUFBUSxHQUFHLENBQUMsQ0FBQztRQXVKekIsY0FBUyxHQUFHLFVBQUMsT0FBTyxFQUFFLE1BQU87WUFDM0IsT0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM3RSxDQUFDLENBQUE7UUF2SUMsSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLElBQUksRUFBRTtZQUM3QyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksRUFBRSxDQUFDO1NBQ2xCLENBQUMsdUdBQXVHO1FBQ3pHLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRW5CLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM3QixJQUFJLENBQUMs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QWU7SUFDZDtRQUFYLFVBQVU7OzhDQUFjO0lBQ2I7UUFBWCxVQUFVOzs0Q0FBZ0I7SUFDakI7UUFBVCxRQUFROzs7eUNBRVI7SUFDUztRQUFULFFBQVE7Ozt3Q0FFUjtJQTRFUztRQUFULFFBQVE7OzttREFFUjtJQW9RTztRQUFQLE1BQU07Ozs7aURBR047SUFDSCxlQUFDO0NBdFhELEFBc1hDLElBQUE7U0F0WFksUUFBUTtBQXdYckI7SUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLGNBQWMsQ0FBQyxDQUFDO0FBQ3BELENBQUMiLCJmaWxlIjoidHJlZS1ub2RlLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG9ic2VydmFibGUsIGNvbXB1dGVkLCByZWFjdGlvbiwgYXV0b3J1biwgYWN0aW9uIH0gZnJvbSAnbW9ieCc7XHJcbmltcG9ydCB7IFRyZWVNb2RlbCB9IGZyb20gJy4vdHJlZS5tb2RlbCc7XHJcbmltcG9ydCB7IFRyZWVPcHRpb25zIH0gZnJvbSAnLi90cmVlLW9wdGlvbnMubW9kZWwnO1xyXG5pbXBvcnQgeyBJVHJlZU5vZGUgfSBmcm9tICcuLi9kZWZzL2FwaSc7XHJcbmltcG9ydCB7IFRSRUVfRVZFTlRTIH0gZnJvbSAnLi4vY29uc3RhbnRzL2V2ZW50cyc7XHJcblxyXG5pbXBvcnQgZmlyc3QgZnJvbSAnbG9kYXNoL2ZpcnN0JztcclxuaW1wb3J0IGxhc3QgZnJvbSAnbG9kYXNoL2xhc3QnO1xyXG5pbXBvcnQgc29tZSBmcm9tICdsb2Rhc2gvc29tZSc7XHJcbmltcG9ydCBldmVyeSBmcm9tICdsb2Rhc2gvZXZlcnknO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRyZWVOb2RlIGltcGxlbWVudHMgSVRyZWVOb2RlIHtcclxuICBAY29tcHV0ZWQgZ2V0IGlzSGlkZGVuKCkgeyByZXR1cm4gdGhpcy50cmVlTW9kZWwuaXNIaWRkZW4odGhpcyk7IH07XHJcbiAgQGNvbXB1dGVkIGdldCBpc0V4cGFuZGVkKCkgeyByZXR1cm4gdGhpcy50cmVlTW9kZWwuaXNFeHBhbmRlZCh0aGlzKTsgfTtcclxuICBAY29tcHV0ZWQgZ2V0IGlzQWN0aXZlKCkgeyByZXR1cm4gdGhpcy50cmVlTW9kZWwuaXNBY3RpdmUodGhpcyk7IH07XHJcbiAgQGNvbXB1dGVkIGdldCBpc0ZvY3VzZWQoKSB7IHJldHVybiB0aGlzLnRyZWVNb2RlbC5pc05vZGVGb2N1c2VkKHRoaXMpOyB9O1xyXG4gIEBjb21wdXRlZCBnZXQgaXNTZWxlY3RlZCgpIHtcclxuICAgIGlmICh0aGlzLmlzTGVhZikge1xyXG4gICAgICByZXR1cm4gdGhpcy50cmVlTW9kZWwuaXNTZWxlY3RlZCh0aGlzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBzb21lKHRoaXMuY2hpbGRyZW4sIChub2RlKSA9PiBub2RlLmlzU2VsZWN0ZWQpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgQGNvbXB1dGVkIGdldCBpc0FsbFNlbGVjdGVkKCkge1xyXG4gICAgaWYgKHRoaXMuaXNMZWFmKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmlzU2VsZWN0ZWQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZXZlcnkodGhpcy5jaGlsZHJlbiwgKG5vZGUpID0+IG5vZGUuaXNBbGxTZWxlY3RlZCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBAY29tcHV0ZWQgZ2V0IGlzUGFydGlhbGx5U2VsZWN0ZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pc1NlbGVjdGVkICYmICF0aGlzLmlzQWxsU2VsZWN0ZWQ7XHJcbiAgfVxyXG5cclxuICBAb2JzZXJ2YWJsZSBjaGlsZHJlbjogVHJlZU5vZGVbXTtcclxuICBAb2JzZXJ2YWJsZSBpbmRleDogbnVtYmVyO1xyXG4gIEBvYnNlcnZhYmxlIHBvc2l0aW9uID0gMDtcclxuICBAb2JzZXJ2YWJsZSBoZWlnaHQ6IG51bWJlcjtcclxuICBAY29tcHV0ZWQgZ2V0IGxldmVsKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5sZXZlbCArIDEgOiAwO1xyXG4gIH1cclxuICBAY29tcHV0ZWQgZ2V0IHBhdGgoKTogc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuIHRoaXMucGFyZW50ID8gWy4uLnRoaXMucGFyZW50LnBhdGgsIHRoaXMuaWRdIDogW107XHJcbiAgfVxyXG5cclxuICBnZXQgZWxlbWVudFJlZigpOiBhbnkge1xyXG4gICAgdGhyb3cgYEVsZW1lbnQgUmVmIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQgc2luY2UgaW50cm9kdWNpbmcgdmlydHVhbCBzY3JvbGxcXG5cclxuICAgICAgWW91IG1heSB1c2UgYSB0ZW1wbGF0ZSB0byBvYnRhaW4gYSByZWZlcmVuY2UgdG8gdGhlIGVsZW1lbnRgO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfb3JpZ2luYWxOb2RlOiBhbnk7XHJcbiAgZ2V0IG9yaWdpbmFsTm9kZSgpIHsgcmV0dXJuIHRoaXMuX29yaWdpbmFsTm9kZTsgfTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGRhdGE6IGFueSwgcHVibGljIHBhcmVudDogVHJlZU5vZGUsIHB1YmxpYyB0cmVlTW9kZWw6IFRyZWVNb2RlbCwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKHRoaXMuaWQgPT09IHVuZGVmaW5lZCB8fCB0aGlzLmlkID09PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuaWQgPSB1dWlkKCk7XHJcbiAgICB9IC8vIE1ha2Ugc3VyZSB0aGVyZSdzIGEgdW5pcXVlIGlkIHdpdGhvdXQgb3ZlcnJpZGluZyBleGlzdGluZyBpZHMgdG8gd29yayB3aXRoIGltbXV0YWJsZSBkYXRhIHN0cnVjdHVyZXNcclxuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcclxuXHJcbiAgICBpZiAodGhpcy5nZXRGaWVsZCgnY2hpbGRyZW4nKSkge1xyXG4gICAgICB0aGlzLl9pbml0Q2hpbGRyZW4oKTtcclxuICAgIH1cclxuICAgIHRoaXMuYXV0b0xvYWRDaGlsZHJlbigpO1xyXG4gIH1cclxuXHJcbiAgLy8gaGVscGVyIGdldCBmdW5jdGlvbnM6XHJcbiAgZ2V0IGhhc0NoaWxkcmVuKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICEhKHRoaXMuZ2V0RmllbGQoJ2hhc0NoaWxkcmVuJykgfHwgKHRoaXMuY2hpbGRyZW4gJiYgdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSk7XHJcbiAgfVxyXG4gIGdldCBpc0NvbGxhcHNlZCgpOiBib29sZWFuIHsgcmV0dXJuICF0aGlzLmlzRXhwYW5kZWQ7IH1cclxuICBnZXQgaXNMZWFmKCk6IGJvb2xlYW4geyByZXR1cm4gIXRoaXMuaGFzQ2hpbGRyZW47IH1cclxuICBnZXQgaXNSb290KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5wYXJlbnQuZGF0YS52aXJ0dWFsOyB9XHJcbiAgZ2V0IHJlYWxQYXJlbnQoKTogVHJlZU5vZGUgeyByZXR1cm4gdGhpcy5pc1Jvb3QgPyBudWxsIDogdGhpcy5wYXJlbnQ7IH1cclxuXHJcbiAgLy8gcHJveHkgZnVuY3Rpb25zOlxyXG4gIGdldCBvcHRpb25zKCk6IFRyZWVPcHRpb25zIHsgcmV0dXJuIHRoaXMudHJlZU1vZGVsLm9wdGlvbnM7IH1cclxuICBmaXJlRXZlbnQoZXZlbnQpIHsgdGhpcy50cmVlTW9kZWwuZmlyZUV2ZW50KGV2ZW50KTsgfVxyXG5cclxuICAvLyBmaWVsZCBhY2Nlc3NvcnM6XHJcbiAgZ2V0IGRpc3BsYXlGaWVsZCgpIHtcclxuICAgIHJldHVybiB0aGlzLmdldEZpZWxkKCdkaXNwbGF5Jyk7XHJcbiAgfVxyXG5cclxuICBnZXQgaWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRGaWVsZCgnaWQnKTtcclxuICB9XHJcblxyXG4gIHNldCBpZCh2YWx1ZSkge1xyXG4gICAgdGhpcy5zZXRGaWVsZCgnaWQnLCB2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRGaWVsZChrZXkpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGFbdGhpcy5vcHRpb25zW2Ake2tleX1GaWVsZGBdXTtcclxuICB9XHJcblxyXG4gIHNldEZpZWxkKGtleSwgdmFsdWUpIHtcclxuICAgIHRoaXMuZGF0YVt0aGlzLm9wdGlvbnNbYCR7a2V5fUZpZWxkYF1dID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICAvLyB0cmF2ZXJzaW5nOlxyXG4gIF9maW5kQWRqYWNlbnRTaWJsaW5nKHN0ZXBzLCBza2lwSGlkZGVuID0gZmFsc2UpIHtcclxuICAgIGNvbnN0IHNpYmxpbmdzID0gdGhpcy5fZ2V0UGFyZW50c0NoaWxkcmVuKHNraXBIaWRkZW4pO1xyXG4gICAgY29uc3QgaW5kZXggPSBzaWJsaW5ncy5pbmRleE9mKHRoaXMpO1xyXG5cclxuICAgIHJldHVybiBzaWJsaW5ncy5sZW5ndGggPiBpbmRleCArIHN0ZXBzID8gc2libGluZ3NbaW5kZXggKyBzdGVwc10gOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgZmluZE5leHRTaWJsaW5nKHNraXBIaWRkZW4gPSBmYWxzZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZpbmRBZGphY2VudFNpYmxpbmcoKzEsIHNraXBIaWRkZW4pO1xyXG4gIH1cclxuXHJcbiAgZmluZFByZXZpb3VzU2libGluZyhza2lwSGlkZGVuID0gZmFsc2UpIHtcclxuICAgIHJldHVybiB0aGlzLl9maW5kQWRqYWNlbnRTaWJsaW5nKC0xLCBza2lwSGlkZGVuKTtcclxuICB9XHJcblxyXG4gIGdldFZpc2libGVDaGlsZHJlbigpIHtcclxuICAgIHJldHVybiB0aGlzLnZpc2libGVDaGlsZHJlbjtcclxuICB9XHJcblxyXG4gIEBjb21wdXRlZCBnZXQgdmlzaWJsZUNoaWxkcmVuKCkge1xyXG4gICAgcmV0dXJuICh0aGlzLmNoaWxkcmVuIHx8IFtdKS5maWx0ZXIoKG5vZGUpID0+ICFub2RlLmlzSGlkZGVuKTtcclxuICB9XHJcblxyXG4gIGdldEZpcnN0Q2hpbGQoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XHJcbiAgICBsZXQgY2hpbGRyZW4gPSBza2lwSGlkZGVuID8gdGhpcy52aXNpYmxlQ2hpbGRyZW4gOiB0aGlzLmNoaWxkcmVuO1xyXG5cclxuICAgIHJldHVybiBmaXJzdChjaGlsZHJlbiB8fCBbXSk7XHJcbiAgfVxyXG5cclxuICBnZXRMYXN0Q2hpbGQoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XHJcbiAgICBsZXQgY2hpbGRyZW4gPSBza2lwSGlkZGVuID8gdGhpcy52aXNpYmxlQ2hpbGRyZW4gOiB0aGlzLmNoaWxkcmVuO1xyXG5cclxuICAgIHJldHVybiBsYXN0KGNoaWxkcmVuIHx8IFtdKTtcclxuICB9XHJcblxyXG4gIGZpbmROZXh0Tm9kZShnb0luc2lkZSA9IHRydWUsIHNraXBIaWRkZW4gPSBmYWxzZSkge1xyXG4gICAgcmV0dXJuIGdvSW5zaWRlICYmIHRoaXMuaXNFeHBhbmRlZCAmJiB0aGlzLmdldEZpcnN0Q2hpbGQoc2tpcEhpZGRlbikgfHxcclxuICAgICAgICAgICB0aGlzLmZpbmROZXh0U2libGluZyhza2lwSGlkZGVuKSB8fFxyXG4gICAgICAgICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmZpbmROZXh0Tm9kZShmYWxzZSwgc2tpcEhpZGRlbik7XHJcbiAgfVxyXG5cclxuICBmaW5kUHJldmlvdXNOb2RlKHNraXBIaWRkZW4gPSBmYWxzZSkge1xyXG4gICAgbGV0IHByZXZpb3VzU2libGluZyA9IHRoaXMuZmluZFByZXZpb3VzU2libGluZyhza2lwSGlkZGVuKTtcclxuICAgIGlmICghcHJldmlvdXNTaWJsaW5nKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJlYWxQYXJlbnQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJldmlvdXNTaWJsaW5nLl9nZXRMYXN0T3BlbkRlc2NlbmRhbnQoc2tpcEhpZGRlbik7XHJcbiAgfVxyXG5cclxuICBfZ2V0TGFzdE9wZW5EZXNjZW5kYW50KHNraXBIaWRkZW4gPSBmYWxzZSkge1xyXG4gICAgY29uc3QgbGFzdENoaWxkID0gdGhpcy5nZXRMYXN0Q2hpbGQoc2tpcEhpZGRlbik7XHJcbiAgICByZXR1cm4gKHRoaXMuaXNDb2xsYXBzZWQgfHwgIWxhc3RDaGlsZClcclxuICAgICAgPyB0aGlzXHJcbiAgICAgIDogbGFzdENoaWxkLl9nZXRMYXN0T3BlbkRlc2NlbmRhbnQoc2tpcEhpZGRlbik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9nZXRQYXJlbnRzQ2hpbGRyZW4oc2tpcEhpZGRlbiA9IGZhbHNlKTogYW55W10ge1xyXG4gICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLnBhcmVudCAmJlxyXG4gICAgICAoc2tpcEhpZGRlbiA/IHRoaXMucGFyZW50LmdldFZpc2libGVDaGlsZHJlbigpIDogdGhpcy5wYXJlbnQuY2hpbGRyZW4pO1xyXG5cclxuICAgIHJldHVybiBjaGlsZHJlbiB8fCBbXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0SW5kZXhJblBhcmVudChza2lwSGlkZGVuID0gZmFsc2UpIHtcclxuICAgIHJldHVybiB0aGlzLl9nZXRQYXJlbnRzQ2hpbGRyZW4oc2tpcEhpZGRlbikuaW5kZXhPZih0aGlzKTtcclxuICB9XHJcblxyXG4gIGlzRGVzY2VuZGFudE9mKG5vZGU6IFRyZWVOb2RlKSB7XHJcbiAgICBpZiAodGhpcyA9PT0gbm9kZSkgcmV0dXJuIHRydWU7XHJcbiAgICBlbHNlIHJldHVybiB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5pc0Rlc2NlbmRhbnRPZihub2RlKTtcclxuICB9XHJcblxyXG4gIGdldE5vZGVQYWRkaW5nKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmxldmVsUGFkZGluZyAqICh0aGlzLmxldmVsIC0gMSkgKyAncHgnO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2xhc3MoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBbdGhpcy5vcHRpb25zLm5vZGVDbGFzcyh0aGlzKSwgYHRyZWUtbm9kZS1sZXZlbC0keyB0aGlzLmxldmVsIH1gXS5qb2luKCcgJyk7XHJcbiAgfVxyXG5cclxuICBvbkRyb3AoJGV2ZW50KSB7XHJcbiAgICB0aGlzLm1vdXNlQWN0aW9uKCdkcm9wJywgJGV2ZW50LmV2ZW50LCB7XHJcbiAgICAgIGZyb206ICRldmVudC5lbGVtZW50LFxyXG4gICAgICB0bzogeyBwYXJlbnQ6IHRoaXMsIGluZGV4OiAwLCBkcm9wT25Ob2RlOiB0cnVlIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYWxsb3dEcm9wID0gKGVsZW1lbnQsICRldmVudD8pID0+IHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYWxsb3dEcm9wKGVsZW1lbnQsIHsgcGFyZW50OiB0aGlzLCBpbmRleDogMCB9LCAkZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgYWxsb3dEcmFnKCkge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hbGxvd0RyYWcodGhpcyk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gaGVscGVyIG1ldGhvZHM6XHJcbiAgbG9hZE5vZGVDaGlsZHJlbigpIHtcclxuICAgIGlmICghdGhpcy5vcHRpb25zLmdldENoaWxkcmVuKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTsgLy8gTm90IGdldENoaWxkcmVuIG1ldGhvZCAtIGZvciB1c2luZyByZWR1eFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLm9wdGlvbnMuZ2V0Q2hpbGRyZW4odGhpcykpXHJcbiAgICAgIC50aGVuKChjaGlsZHJlbikgPT4ge1xyXG4gICAgICAgIGlmIChjaGlsZHJlbikge1xyXG4gICAgICAgICAgdGhpcy5zZXRGaWVsZCgnY2hpbGRyZW4nLCBjaGlsZHJlbik7XHJcbiAgICAgICAgICB0aGlzLl9pbml0Q2hpbGRyZW4oKTtcclxuICAgICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNoaWxkLmdldEZpZWxkKCdpc0V4cGFuZGVkJykgJiYgY2hpbGQuaGFzQ2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICBjaGlsZC5leHBhbmQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH19KS50aGVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLmZpcmVFdmVudCh7XHJcbiAgICAgICAgICBldmVudE5hbWU6IFRSRUVfRVZFTlRTLmxvYWROb2RlQ2hpbGRyZW4sXHJcbiAgICAgICAgICBub2RlOiB0aGlzXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZXhwYW5kKCkge1xyXG4gICAgaWYgKCF0aGlzLmlzRXhwYW5kZWQpIHtcclxuICAgICAgdGhpcy50b2dnbGVFeHBhbmRlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgY29sbGFwc2UoKSB7XHJcbiAgICBpZiAodGhpcy5pc0V4cGFuZGVkKSB7XHJcbiAgICAgIHRoaXMudG9nZ2xlRXhwYW5kZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGRvRm9yQWxsKGZuOiAobm9kZTogSVRyZWVOb2RlKSA9PiBhbnkpIHtcclxuICAgIFByb21pc2UucmVzb2x2ZShmbih0aGlzKSkudGhlbigoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gY2hpbGQuZG9Gb3JBbGwoZm4pKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBleHBhbmRBbGwoKSB7XHJcbiAgICB0aGlzLmRvRm9yQWxsKChub2RlKSA9PiBub2RlLmV4cGFuZCgpKTtcclxuICB9XHJcblxyXG4gIGNvbGxhcHNlQWxsKCkge1xyXG4gICAgdGhpcy5kb0ZvckFsbCgobm9kZSkgPT4gbm9kZS5jb2xsYXBzZSgpKTtcclxuICB9XHJcblxyXG4gIGVuc3VyZVZpc2libGUoKSB7XHJcbiAgICBpZiAodGhpcy5yZWFsUGFyZW50KSB7XHJcbiAgICAgIHRoaXMucmVhbFBhcmVudC5leHBhbmQoKTtcclxuICAgICAgdGhpcy5yZWFsUGFyZW50LmVuc3VyZVZpc2libGUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHRvZ2dsZUV4cGFuZGVkKCkge1xyXG4gICAgdGhpcy5zZXRJc0V4cGFuZGVkKCF0aGlzLmlzRXhwYW5kZWQpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgc2V0SXNFeHBhbmRlZCh2YWx1ZSkge1xyXG4gICAgaWYgKHRoaXMuaGFzQ2hpbGRyZW4pIHtcclxuICAgICAgdGhpcy50cmVlTW9kZWwuc2V0RXhwYW5kZWROb2RlKHRoaXMsIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9O1xyXG5cclxuICBhdXRvTG9hZENoaWxkcmVuKCkge1xyXG4gICAgcmVhY3Rpb24oXHJcbiAgICAgICgpID0+IHRoaXMuaXNFeHBhbmRlZCxcclxuICAgICAgKGlzRXhwYW5kZWQpID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hpbGRyZW4gJiYgdGhpcy5oYXNDaGlsZHJlbiAmJiBpc0V4cGFuZGVkKSB7XHJcbiAgICAgICAgICB0aGlzLmxvYWROb2RlQ2hpbGRyZW4oKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHsgZmlyZUltbWVkaWF0ZWx5OiB0cnVlIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBzZXRJc0FjdGl2ZSh2YWx1ZSwgbXVsdGkgPSBmYWxzZSkge1xyXG4gICAgdGhpcy50cmVlTW9kZWwuc2V0QWN0aXZlTm9kZSh0aGlzLCB2YWx1ZSwgbXVsdGkpO1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuZm9jdXModGhpcy5vcHRpb25zLnNjcm9sbE9uU2VsZWN0KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHNldElzU2VsZWN0ZWQodmFsdWUpIHtcclxuICAgIGlmICh0aGlzLmlzTGVhZikge1xyXG4gICAgICB0aGlzLnRyZWVNb2RlbC5zZXRTZWxlY3RlZE5vZGUodGhpcywgdmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gY2hpbGQuc2V0SXNTZWxlY3RlZCh2YWx1ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlU2VsZWN0ZWQoKSB7XHJcbiAgICB0aGlzLnNldElzU2VsZWN0ZWQoIXRoaXMuaXNTZWxlY3RlZCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVBY3RpdmF0ZWQobXVsdGkgPSBmYWxzZSkge1xyXG4gICAgdGhpcy5zZXRJc0FjdGl2ZSghdGhpcy5pc0FjdGl2ZSwgbXVsdGkpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgc2V0QWN0aXZlQW5kVmlzaWJsZShtdWx0aSA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLnNldElzQWN0aXZlKHRydWUsIG11bHRpKVxyXG4gICAgICAuZW5zdXJlVmlzaWJsZSgpO1xyXG5cclxuICAgIHNldFRpbWVvdXQodGhpcy5zY3JvbGxJbnRvVmlldy5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHNjcm9sbEludG9WaWV3KGZvcmNlID0gZmFsc2UpIHtcclxuICAgIHRoaXMudHJlZU1vZGVsLnZpcnR1YWxTY3JvbGwuc2Nyb2xsSW50b1ZpZXcodGhpcywgZm9yY2UpO1xyXG4gIH1cclxuXHJcbiAgZm9jdXMoc2Nyb2xsID0gdHJ1ZSkge1xyXG4gICAgbGV0IHByZXZpb3VzTm9kZSA9IHRoaXMudHJlZU1vZGVsLmdldEZvY3VzZWROb2RlKCk7XHJcbiAgICB0aGlzLnRyZWVNb2RlbC5zZXRGb2N1c2VkTm9kZSh0aGlzKTtcclxuICAgIGlmIChzY3JvbGwpIHtcclxuICAgICAgdGhpcy5zY3JvbGxJbnRvVmlldygpO1xyXG4gICAgfVxyXG4gICAgaWYgKHByZXZpb3VzTm9kZSkge1xyXG4gICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMuYmx1ciwgbm9kZTogcHJldmlvdXNOb2RlIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLmZvY3VzLCBub2RlOiB0aGlzIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgYmx1cigpIHtcclxuICAgIGxldCBwcmV2aW91c05vZGUgPSB0aGlzLnRyZWVNb2RlbC5nZXRGb2N1c2VkTm9kZSgpO1xyXG4gICAgdGhpcy50cmVlTW9kZWwuc2V0Rm9jdXNlZE5vZGUobnVsbCk7XHJcbiAgICBpZiAocHJldmlvdXNOb2RlKSB7XHJcbiAgICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5ibHVyLCBub2RlOiB0aGlzIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgc2V0SXNIaWRkZW4odmFsdWUpIHtcclxuICAgIHRoaXMudHJlZU1vZGVsLnNldElzSGlkZGVuKHRoaXMsIHZhbHVlKTtcclxuICB9XHJcblxyXG4gIGhpZGUoKSB7XHJcbiAgICB0aGlzLnNldElzSGlkZGVuKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgc2hvdygpIHtcclxuICAgIHRoaXMuc2V0SXNIaWRkZW4oZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgbW91c2VBY3Rpb24oYWN0aW9uTmFtZTogc3RyaW5nLCAkZXZlbnQsIGRhdGE6IGFueSA9IG51bGwpIHtcclxuICAgIHRoaXMudHJlZU1vZGVsLnNldEZvY3VzKHRydWUpO1xyXG5cclxuICAgIGNvbnN0IGFjdGlvbk1hcHBpbmcgPSB0aGlzLm9wdGlvbnMuYWN0aW9uTWFwcGluZy5tb3VzZTtcclxuICAgIGNvbnN0IGFjdGlvbiA9IGFjdGlvbk1hcHBpbmdbYWN0aW9uTmFtZV07XHJcblxyXG4gICAgaWYgKGFjdGlvbikge1xyXG4gICAgICBhY3Rpb24odGhpcy50cmVlTW9kZWwsIHRoaXMsICRldmVudCwgZGF0YSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRTZWxmSGVpZ2h0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5ub2RlSGVpZ2h0KHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgQGFjdGlvbiBfaW5pdENoaWxkcmVuKCkge1xyXG4gICAgdGhpcy5jaGlsZHJlbiA9IHRoaXMuZ2V0RmllbGQoJ2NoaWxkcmVuJylcclxuICAgICAgLm1hcCgoYywgaW5kZXgpID0+IG5ldyBUcmVlTm9kZShjLCB0aGlzLCB0aGlzLnRyZWVNb2RlbCwgaW5kZXgpKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHV1aWQoKSB7XHJcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwMDAwMDAwKTtcclxufVxyXG4iXX0=