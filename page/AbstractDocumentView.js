import ns from 'ima/namespace';
import React from 'react';
import AbstractComponent from './AbstractComponent';
import MetaManager from 'ima/meta/MetaManager';

ns.namespace('ima.page');

/**
 * The base class for document view components. The document view components
 * create the basic markup, i.e. the {@code html} or {@code head} elements,
 * along with an element that will contain the view associated with the current
 * route.
 *
 * Note that the document views are always rendered only at the server-side and
 * cannot be switched at the client-side.
 *
 * @abstract
 * @class AbstractDocumentView
 * @namespace ima.page
 * @module ima
 * @submodule ima.page
 */
export default class AbstractDocumentView extends AbstractComponent {
	/**
	 * Returns the ID of the element (the value of the {@code id} attribute)
	 * generated by this component that will contain the rendered page view.
	 *
	 * @abstract
	 * @property masterElementId
	 * @return {string} The ID of the element generated by this component that
	 *         will contain the rendered page view.
	 */
	static get masterElementId() {
		throw new Error('The masterElementId getter is abstract and must be ' +
				'overridden');
	}

	/**
	 * Returns the expected types of the props passed to this component.
	 *
	 * The {@code metaManager} is used to generate the {@code meta} tags in the
	 * {@code head} and the content of the {@code title} element. The
	 * {@code page} contains the rendered HTML of the current view. The
	 * {@code revivalSettings} contains a JavaScript snippet that initializes
	 * the configuration of the IMA platform at the client-side.
	 *
	 * @return {{metaManager: *, page: *, revivalSettings: *}} The expected
	 *         types of the props passed to this component.
	 */
	static get propTypes() {
		return {
			metaManager: React.PropTypes.instanceOf(MetaManager).isRequired,
			page: React.PropTypes.string.isRequired,
			revivalSettings: React.PropTypes.string.isRequired
		};
	}
}

ns.ima.page.AbstractDocumentView = AbstractDocumentView;
