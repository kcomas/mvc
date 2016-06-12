
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

    }

}

export default Controller;
