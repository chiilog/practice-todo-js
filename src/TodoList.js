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
			this.setupIncompleteItem();
			this.clearText();
		});
	}

	/**
	 * 未完了リストの生成
	 */
	setupIncompleteItem() {
		const area = document.getElementById( INCOMPLETE_AREA_NAME );
		const listItem = this.setupListItem();
		const todoDiv = this.setupTodoDiv();
		area.appendChild( listItem );
		todoDiv.appendChild( this.setupText() );
		todoDiv.appendChild( this.setupCompleteButton() );
		todoDiv.appendChild( this.setupDeleteButton() );
		listItem.appendChild( todoDiv );
	}

	/**
	 * TODO: 完了リストの生成をひとつのメソッドにできないか検証
	 */

	/**
	 * 完了ボタンの生成
	 *
	 * HACK: ボタンの生成と機能追加が1つのメソッドで行われてる
	 */
	setupCompleteButton() {
		const button = document.createElement( 'button' );
		if ( this.options?.complete?.label ) {
			button.innerText = this.options.complete.label;
		}
		if ( this.options?.complete?.classname ) {
			button.className = this.options.complete.classname;
		}

		button.addEventListener( 'click', () => {
			const todoElement = button.closest( '.todo-block' );
			const listItem = this.setupListItem();
			document
				.getElementById( INCOMPLETE_AREA_NAME )
				.removeChild( todoElement.parentNode );

			todoElement.removeChild( todoElement.querySelector( '.complete-button' ) );
			todoElement.removeChild( todoElement.querySelector( '.delete-button' ) );
			todoElement.appendChild( this.setupRestoreButton() );
			listItem.appendChild( todoElement );
			document
				.getElementById( COMPLETE_AREA_NAME )
				.appendChild( listItem );
		} );

		return button;
	}

	/**
	 * 削除ボタンの生成
	 *
	 * HACK: ボタンの生成と機能追加が1つのメソッドで行われてる
	 */
	setupDeleteButton() {
		const button = document.createElement( 'button' );
		if ( this.options?.del?.label ) {
			button.innerText = this.options.del.label;
		}
		if ( this.options?.del?.classname ) {
			button.className = this.options.del.classname;
		}

		button.addEventListener( 'click', () => {
			const liElement = button.closest( '.list-item' );
			document.getElementById( INCOMPLETE_AREA_NAME ).removeChild( liElement );
		} );

		return button;
	}

	/**
	 * 戻すボタンの生成
	 *
	 * HACK: ボタンの生成と機能追加が1つのメソッドで行われてる
	 */
	setupRestoreButton() {
		const button = document.createElement( 'button' );
		if ( this.options?.restore?.label ) {
			button.innerText = this.options.restore.label;
		}
		if ( this.options?.restore?.classname ) {
			button.className = this.options.restore.classname;
		}

		button.addEventListener( 'click', () => {
			const todoElement = button.closest( '.todo-block' );
			const listItem = this.setupListItem();
			document
				.getElementById( COMPLETE_AREA_NAME )
				.removeChild( todoElement.parentNode );

			todoElement.removeChild( todoElement.querySelector( '.restore-button' ) );
			todoElement.appendChild( this.setupCompleteButton() );
			todoElement.appendChild( this.setupDeleteButton() );
			listItem.appendChild( todoElement );
			document
				.getElementById( INCOMPLETE_AREA_NAME )
				.appendChild( listItem );
		} );

		return button;
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
