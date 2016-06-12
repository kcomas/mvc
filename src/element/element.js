
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
         * The tag of the element
         * @type {string}
         * @abstract
         */
        this.tag;

        /**
         * The attributes of an object
         * @type {Object}
         * @private
         */
        this._atts = {};

        /**
         * The proxy object to the atts
         * @type {Proxy}
         */
        this.atts = new Proxy(this.atts, {
            set(target, property, value, reciver){
                target[property] = value;
                //if the element is rendered update it
                if(this._element){
                    this._element.setAttribute(property, value);
                }
                return true;
            },
            get(target, property, reciver){
                //check if the element is rendered and get it
                if(this._element){
                    target[property] = this._element.getAttribute(property);
                }
                return target[property];
            },
            deleteProperty(target, property){
                //if element remove it from the element
                if(this._element){
                    this._element.removeAttribute(property);
                }
                delete target[property];
                return true;
            }
        });


    }


}

export default MVCElement;
