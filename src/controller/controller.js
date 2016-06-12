
/**
 * Class for holding the main app
 */
class Controller {

    /**
     * Init
     * @param {string} selector - the selector to attach the app to
     */
    constructor(selector){
        
        /**
         * The base of the app
         * @type {Element}
         * @private
         */
        this._base = document.querySelector(selector);

        /**
         * The dom elements stored in a flat layout
         * @type {Object}
         * @private
         */
        this._flatDom = {};

    }

    /**
     * Find an element in the flat dom
     * @param {string} stamp - the stamp name of the value
     * @return {MVCElelemt|array<MVCElement} the found element or an array of similar elements
     */
    find(stamp){
        if(this._flatDom[stamp]){
            return this._flatDom[stamp];
        }
    }

}

export default Controller;
