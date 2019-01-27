// element-closest | CC0-1.0 | github.com/jonathantneal/closest
if (typeof Element !== 'undefined') {
    if (typeof Element.prototype.matches !== 'function') {
        Element.prototype.matches = Element.prototype.msMatchesSelector ||
            Element.prototype['mozMatchesSelector'] ||
            Element.prototype.webkitMatchesSelector ||
            function matches(selector) {
                var element = this;
                var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
                var index = 0;
                while (elements[index] && elements[index] !== element) {
                    ++index;
                }
                return Boolean(elements[index]);
            };
    }
    if (typeof Element.prototype['closest'] !== 'function') {
        Element.prototype['closest'] = function closest(selector) {
            var element = this;
            while (element && element.nodeType === 1) {
                if (element.matches(selector)) {
                    return element;
                }
                element = element.parentNode;
            }
            return null;
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi92ZW5kb3IvY2xvc2VzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrREFBK0Q7QUFDL0QsSUFBSSxPQUFPLE9BQU8sS0FBSyxXQUFXLEVBQUU7SUFDbEMsSUFBSSxPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtRQUNuRCxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLGlCQUFpQjtZQUMzRCxPQUFPLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDO1lBQ3ZDLE9BQU8sQ0FBQyxTQUFTLENBQUMscUJBQXFCO1lBQ3ZDLGlCQUFpQixRQUFRO2dCQUN2QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ25CLElBQUksUUFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3RGLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFFZCxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssT0FBTyxFQUFFO29CQUNyRCxFQUFFLEtBQUssQ0FBQztpQkFDVDtnQkFFRCxPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUM7S0FDUDtJQUVELElBQUksT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLFVBQVUsRUFBRTtRQUN0RCxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLGlCQUFpQixRQUFRO1lBQ3RELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztZQUVuQixPQUFPLE9BQU8sSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRTtnQkFDeEMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUM3QixPQUFPLE9BQU8sQ0FBQztpQkFDaEI7Z0JBRUQsT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7YUFDOUI7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQztLQUNIO0NBQ0YiLCJmaWxlIjoiY2xvc2VzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBlbGVtZW50LWNsb3Nlc3QgfCBDQzAtMS4wIHwgZ2l0aHViLmNvbS9qb25hdGhhbnRuZWFsL2Nsb3Nlc3RcclxuaWYgKHR5cGVvZiBFbGVtZW50ICE9PSAndW5kZWZpbmVkJykge1xyXG4gIGlmICh0eXBlb2YgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyA9IEVsZW1lbnQucHJvdG90eXBlLm1zTWF0Y2hlc1NlbGVjdG9yIHx8XHJcbiAgICAgICAgRWxlbWVudC5wcm90b3R5cGVbJ21vek1hdGNoZXNTZWxlY3RvciddIHx8XHJcbiAgICAgICAgRWxlbWVudC5wcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gbWF0Y2hlcyhzZWxlY3Rvcikge1xyXG4gICAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzO1xyXG4gICAgICAgICAgbGV0IGVsZW1lbnRzID0gKGVsZW1lbnQuZG9jdW1lbnQgfHwgZWxlbWVudC5vd25lckRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcblxyXG4gICAgICAgICAgd2hpbGUgKGVsZW1lbnRzW2luZGV4XSAmJiBlbGVtZW50c1tpbmRleF0gIT09IGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgKytpbmRleDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByZXR1cm4gQm9vbGVhbihlbGVtZW50c1tpbmRleF0pO1xyXG4gICAgICAgIH07XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIEVsZW1lbnQucHJvdG90eXBlWydjbG9zZXN0J10gIT09ICdmdW5jdGlvbicpIHtcclxuICAgIEVsZW1lbnQucHJvdG90eXBlWydjbG9zZXN0J10gPSBmdW5jdGlvbiBjbG9zZXN0KHNlbGVjdG9yKSB7XHJcbiAgICAgIGxldCBlbGVtZW50ID0gdGhpcztcclxuXHJcbiAgICAgIHdoaWxlIChlbGVtZW50ICYmIGVsZW1lbnQubm9kZVR5cGUgPT09IDEpIHtcclxuICAgICAgICBpZiAoZWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKSkge1xyXG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==