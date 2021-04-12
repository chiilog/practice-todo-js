// 未完了todoリストのulのid名
const INCOMPLETE_AREA_NAME = 'incomplete-list';

// 完了todoリストのulのid名
const COMPLETE_AREA_NAME = 'complete-list';

class TodoList {
	/**
	 * 1. inputにtodoを入れると、未完了のtodoにリストとして追加される
	 * 2. 完了したら完了したtodoリストに移動する
	 * 3. todoを間違えて登録した場合に削除できる
	 */

	/**
	 * Todoを動作させるターゲットを指定する
	 *
	 * @param {Element} target
	 * @param {Object} options
	 */
	constructor ( target, options ) {
		this.target = target;
		this.options = options;
		this.registerAddButton();
	}

	/**
	 * inputに入力したテキストを返す
	 */
	inputText() {
		return this.target.value;
	}

	/**
	 * pタグにテキストを入れる
	 */
	setupText() {
		const text = document.createElement( 'p' );
		text.innerText = this.inputText();
		return text;
	}

	/**
	 * inputの入力欄をクリアする
	 */
	clearText() {
		return this.target.value = '';
	}

	/**
	 * 追加ボタンの動作
	 */
	registerAddButton() {
		document.getElementById( 'add-button' ).addEventListener( 'click', () => {
			this.initIncompleteItem();
			this.clearText();
		});
	}

	/**
	 * 完了エリアへの描画かどうか
	 *
	 * @param {String} area
	 * @return {boolean}
	 */
	isComplete( area ) {
		return area === COMPLETE_AREA_NAME;
	}

	/**
	 * ボタンの生成
	 *
	 * @param {String} area
	 * @param {Element} target
	 */
	appendButtons( area, target ) {
		if ( this.isComplete( area ) ) {
			target.appendChild( this.setupRestoreButton() );
		} else {
			target.appendChild( this.setupCompleteButton() );
			target.appendChild( this.setupDeleteButton() );
		}
	}

	/**
	 * 完了ボタン・削除ボタンの除去
	 *
	 * @param {String} area
	 * @param {Element} target
	 */
	removeButtons( area, target ) {
		if ( this.isComplete( area ) ) {
			target.removeChild( target.querySelector( '.complete-button' ) );
			target.removeChild( target.querySelector( '.delete-button' ) );
		} else {
			target.removeChild( target.querySelector( '.restore-button' ) );
		}
	}

	/**
	 * TODO追加時のリスト生成
	 */
	initIncompleteItem() {
		const area = document.getElementById( INCOMPLETE_AREA_NAME );
		const listItem = this.setupListItem();
		const todoDiv = this.setupTodoDiv();
		area.appendChild( listItem );
		todoDiv.appendChild( this.setupText() );
		this.appendButtons( INCOMPLETE_AREA_NAME, todoDiv );
		listItem.appendChild( todoDiv );
	}

	/**
	 * 未完了リストの生成
	 *
	 * @param {Element} target
	 */
	setupIncompleteItem( target ) {
		const item = this.setupListItem();
		document
			.getElementById( COMPLETE_AREA_NAME )
			.removeChild( target.parentNode );

		this.removeButtons( INCOMPLETE_AREA_NAME, target );
		this.appendButtons( INCOMPLETE_AREA_NAME, target );

		item.appendChild( target );
		document
			.getElementById( INCOMPLETE_AREA_NAME )
			.appendChild( item );
	}

	/**
	 * 完了リストの生成
	 *
	 * @param {Element} element
	 */
	setupCompleteItem( element ) {
		const block = element.closest( '.todo-block' );
		const item = this.setupListItem();
		document
			.getElementById( INCOMPLETE_AREA_NAME )
			.removeChild( block.parentNode );

		this.removeButtons( COMPLETE_AREA_NAME, block );
		this.appendButtons( COMPLETE_AREA_NAME, block );
		item.appendChild( block );
		document
			.getElementById( COMPLETE_AREA_NAME )
			.appendChild( item );
	}

	/**
	 * 完了ボタンの生成
	 */
	setupCompleteButton() {
		const button = document.createElement( 'button' );
		if ( this.options?.complete?.label ) {
			button.innerText = this.options.complete.label;
		}
		if ( this.options?.complete?.classname ) {
			button.className = this.options.complete.classname;
		}

		this.registerCompleteButton( button );

		return button;
	}

	/**
	 * 完了ボタンの動作
	 *
	 * @param {Element} element
	 */
	registerCompleteButton( element ) {
		element.addEventListener( 'click', () => {
			this.setupCompleteItem( element.closest( '.todo-block' ) );
		} );
	}

	/**
	 * 削除ボタンの生成
	 */
	setupDeleteButton() {
		const button = document.createElement( 'button' );
		if ( this.options?.del?.label ) {
			button.innerText = this.options.del.label;
		}
		if ( this.options?.del?.classname ) {
			button.className = this.options.del.classname;
		}

		this.registerDeleteButton( button );

		return button;
	}

	/**
	 * 削除ボタンの動作
	 *
	 * @param {Element} element
	 */
	registerDeleteButton( element ) {
		element.addEventListener( 'click', () => {
			const liElement = element.closest( '.list-item' );
			document.getElementById( INCOMPLETE_AREA_NAME ).removeChild( liElement );
		} );
	}

	/**
	 * 戻すボタンの作成
	 *
	 * @return {HTMLButtonElement}
	 */
	setupRestoreButton() {
		const button = document.createElement( 'button' );
		if ( this.options?.restore?.label ) {
			button.innerText = this.options.restore.label;
		}
		if ( this.options?.restore?.classname ) {
			button.className = this.options.restore.classname;
		}

		this.registerRestoreButton( button );

		return button;
	}

	/**
	 * 戻すボタンの動作
	 *
	 * @param {Element} element
	 */
	registerRestoreButton( element ) {
		element.addEventListener( 'click', () => {
			const target = element.closest( '.todo-block' );
			this.setupIncompleteItem( target );
		} );
	}

	/**
	 * li.list-item の生成
	 */
	setupListItem() {
		const list = document.createElement( 'li' );
		list.className = 'list-item';

		return list;
	}

	/**
	 * div.todo-block の生成
	 */
	setupTodoDiv() {
		const block = document.createElement( 'div' );
		block.className = 'todo-block';

		return block;
	}
}
export default TodoList;
