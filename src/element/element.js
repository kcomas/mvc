
/**
 * The class for each element in the app
 */
class MVCElement {

    /**
     * Init
     * @param {Controller} controller - the app controller
     */
    constructor(controller){

        /**
         * The app controller
         * @type {Controller}
         * @private
         */
        this._controller = controller;

        /**
         * The element in the dom
         * @type {Element}
         * @private
         */
        this._element;

        /**
         * The element text node
         * @type {TextNode}
         * @private
         */
        this._textNode;

        /**
         * The children elements
         * @type {array<MVCElement>
         */
        this.children = [];

        /**
         * The parent element
         * @type {MVCElement}
         */
        this.parent;

        /**
         * The tag of the element
         * @type {string}
         * @abstract
         */
        this.tag;

        /**
         * The identifing name of the element
         * @type {string}
         * @abstract
         */
        this.stamp;

        /**
         * The attributes of the element
         * @type {Object}
         * @private
         */
        this._atts = {};

        /**
         * The proxy object to the atts
         * @type {Proxy}
         */
        this.atts = new Proxy(this.atts, {
            set: (target, property, value, reciver) => {
                //prevent the style tag from being set
                if(property === 'style'){
                    return true;
                } else {
                    target[property] = value;
                    //if the element is rendered update it
                    if(this._element){
                        this._element.setAttribute(property, value);
                    }
                    return true;
                }
            },
            get: (target, property, reciver) => {
                //check if the element is rendered and get it
                if(this._element){
                    target[property] = this._element.getAttribute(property);
                }
                return target[property];
            },
            deleteProperty: (target, property) => {
                //prevnent the style att from being deleted
                if(property === 'style'){
                    return true;
                } else {
                    //if element remove it from the element
                    if(this._element){
                        this._element.removeAttribute(property);
                    }
                    delete target[property];
                    return true;
                }
            }
        });
        
        /**
         * The styles of the element
         * @type {Object}
         * @private
         */
        this._styles = {};

        /**
         * The proxy object to the styles
         * @type {Proxy}
         */
        this.styles = new Proxy(this._styles, {
            set: (target, property, value, reciver) => {
                target[property] = value;
                //add the style to element
                if(this._element){
                    this._element.style[property] = value;
                }       
                return true;
            },
            get: (target, property, reciver) => {
                if(this._element){
                    target[property] = this._element.style[property];
                }
                return target[property];
            },
            deleteProperty: (target, property) => {
                if(this._element){
                    this._element.style[property] = null;
                }
                delete target[property];
                return true;
            }
        });

        /**
         * The data for the element
         * @type {Object}
         * @private
         */
        this._data;

        /**
         * The function if any to be called on data change
         * @type {Function}
         * @abstract
         */
        this.onDataChange = function() {};

        /**
         * The proxy for the data object
         * @type {Proxy}
         */
        this.data = new Proxy(this._data, {
            set: (target, property, value, reciver) => { 
                target[property] = value;
                this.onDataChange();
                //update the text
                if(this._textNode){
                    this._textNode.nodeValue = this.textFn();
                }
                return true;
            },
            deleteProperty: (target, property) => {
                delete target[property];
                this.onDataChnage();
                //update the text
                if(this._textNode){
                    this._textNode.nodeValue = this.textFn();
                }
                return true;
            }
        });

        /**
         * The function used for setting the text
         * @type {Function}
         * @abstract
         */
        this.textFn = function() {};


    }

    /**
     * Find another element by stamp name
     * @param {string} stamp - the stamp name
     * @return {MVCElement|array<MVCElement} an element that matchers or an array of similar elements
     */
    find(stamp){
        return this._controller.find(stamp);
    }


}

export default MVCElement;
