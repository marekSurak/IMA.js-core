import ns from 'imajs/client/core/namespace';
import IMAError from 'imajs/client/core/imaError';

ns.namespace('Core.Decorator.PageStateManager');

/**
 * Decorator for page state manager, which add logic for limiting Extension competence.
 *
 * @class PageStateManager
 * @namespace Core.Decorator.PageStateManager
 * @module Core
 * @submodule Core.Decorator
 *
 * @extends Core.Interface.PageStateManager
 */
export default class PageStateManager extends ns.Core.Interface.PageStateManager {

	/**
	 * @method constructor
	 * @constructor
	 * @param {Core.Interface.PageStateManager} pageStateManager
	 * @param {Array<string>} allowedStateKeys
	 */
	constructor(pageStateManager, allowedStateKeys) {
		super();

		/**
		 *
		 *
		 * @private
		 * @property _pageStateManager
		 * @type {Core.Interface.PageStateManager}
		 */
		this._pageStateManager = pageStateManager;

		/**
		 * Array of access keys for state.
		 *
		 * @private
		 * @property _allowedStateKeys
		 * @type {Array<string>}
		 */
		this._allowedStateKeys = allowedStateKeys;
	}

	/**
	 * @inheritDoc
	 * @override
	 * @method clear
	 */
	clear() {
		this._pageStateManager.clear();
	}

	/**
	 * @inheritDoc
	 * @override
	 * @method setState
	 * @param {Object<string, *>} statePatch
	 */
	setState(statePatch) {
		if ($Debug) {
			var patchKeys = Object.keys(statePatch);
			var deniedKeys = patchKeys.filter((patchKey) => this._allowedStateKeys.indexOf(patchKey) === -1);

			if (deniedKeys.length > 0) {
				throw new IMAError(`Extension can not set state for keys ${deniedKeys.join()}.` +
						` Check your extension or add keys ${deniedKeys.join()} to getAllowedStateKeys.`);
			}
		}

		this._pageStateManager.setState(statePatch);
	}

	/**
	 * @inheritDoc
	 * @override
	 * @method getState
	 * @return {Object<string, *>}
	 */
	getState() {
		return this._pageStateManager.getState();
	}

	/**
	 * @inheritDoc
	 * @override
	 * @method getAllStates
	 * @return {Array<Object<string, *>>}
	 */
	getAllStates() {
		return this._pageStateManager.getAllStates();
	}
}

ns.Core.Decorator.PageStateManager = PageStateManager;