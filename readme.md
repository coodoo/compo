
React container pattern POC
===========================

# Goal
	
	- 增加元件易用性

	- 讓元件與 business logic 完全分離成為 passive part

	- 避免子元件直接操作 action 以免緊密產生相依性

	- 避免需由上往下層層傳遞 callback 的手續

	- 未來能與 Relay 配合，並幫忙優化 write 流程以確保元件可重用性


# 總結

	# 大原則
		
		- 所有元件都在 propTypes{} 內列出自已需要的 prop 與其 type
		
		- 從 reuse 的角度來說，就是不可改寫元件內容，只能透過 prop/callback 傳入資料來操作它

		- 如要改寫，只能透過 extends 的方式來覆寫

	# Container

		- 資料來源
			- 可由外部透過 props 傳入
			- 也可內部直接從 store 取得

		- 重要特徵是提供 actionMap	
			- 透過 actions 屬性傳給直屬元件，通常也就是母元件

		- 無法 reuse
			- 因為它緊密相依外部 actionCreator 
			- 也因為無法 reuse，因此可隨時複製後改寫以適應不同需求

		- container 內可再包 container
			- 並可由 upper container 透過 props 傳資料給 lower container

	# 母元件

		- 特色是透過 actions 屬性拿到一包 callback
			- 以方便分派給下屬子元件

		- 又稱為 compound component，因為它還包了多個子元件

		- 主要功能是操作下屬子元件，傳入 prop 與 callback

		- 可 reuse
			- 但要記得一起帶相依的子元件走

		- 母元件可以被包入其它元件而成為子元件嗎？	
			← 只要能傳入符合該元件 interface 的資料，應該是可以

	# 子元件
		
		- 子元件只有 prop, callback 兩種屬性

		- 又稱為 base component，因為它已是最小單位，裏面不會再包其它子元件

		- 可 reuse

		- 子元件可以變成母元件嗎？
			← 從不可改寫的角度來說，原本子元件沒處理 actions props 的話，自然就無法成為母元件
			← 因為 container 會透過 actions prop 傳入 callback



# 實作細節

	# 讓母/子元件與 biz logic 完全分離，成為 passive part (被動元件)
		
		- biz logic 是指任何 write 操作，例如發動 actions 來進入 data flow
		
		- 元件只需顯示資料，被動接收用戶操作後，將狀況向外反應即可
			- 至於外界會如何處理此互動行為，不關它的事
		
		- 最終是由最外層的 container 元件負責操作 action 

	# 母/子元件一律只讀不寫(透過 prop 傳入資料)
	
		- 母/子元件一律透過 prop 收入資料
			- prop 可以只有一個 user={userVO}
			- 或按不同 domain 分多個 user={userVO} song={songVO} playlist={listVO}
	
	# write 工作交由最外層 container 元件負責

	# 所有元件都只對直屬第一層元件負責(傳入 prop & callback)
	
		- 母元件負責操作下屬的子元件
			- 也就是負責傳 props 與 callback 進入子元件
			- 子元件則只單純的調用 callback, 例如：this.props.onClick(p1, p2)	

		- container 也只負責直屬第一層元件(傳入 prop, callback, actions 至母元件)
		
			- 如此設計必然的結果，是 conatiner 要傳一大包 actionMap 給下層，統包所有可能操作
			- 這是合理的做法，也是唯一能讓母/子元件都能 reuse 的方式

			- container 元件是更外層的 pure data layer
				- 它負責從 store.getAll() 取回所有 domain 資料
				- 再負責將相關 domain 資料餵給 母元件
				- 它也有 render()，但只放一個母元件，將大包資料傳入即可
					- 配發資料至各子元件是 母元件 的事

	# 為何要獨立出 DisplayContainer 而非直接整合在 Display 元件內
		
		- 因為希望 Display 元件日後也能獨立使用，例如被包在其它更大的元件內
		- 因此希望讓它角色單純，本質上跟一個子元件其實語法完全一樣(也就是身上沒有 actionMap)

	# 元件內部的 prop 與 callback 透過契約來明確表列
		- https://facebook.github.io/react/docs/reusable-components.html

		- 例子
			propTypes: {

				actions: React.PropTypes.object,

				// 這是比較嚴謹的合約，將來讓元件用戶更清楚該傳哪些參數進來
				song: React.PropTypes.shape({
			      artist: React.PropTypes.string,
			      name: React.PropTypes.string,
			      duration: React.PropTypes.number
			    }),

				status: React.PropTypes.shape({
			      repeat: React.PropTypes.boolean,
			      position: React.PropTypes.number
			    }),
			},

	# 子元件調用 action callback 時為何要傳出資料？
		- 例如子元件內是個下拉選單，用戶選了新資料，此時一定要靠子元件將最新選的值傳出來
		- 又例如 progress bar，用戶調整了新進度，也要靠子元件傳出最新的值


# 程式架構

	- 模擬一個音樂播放器的顯示面板

	- Display 元件為顯示面板主體
		- 內有 artist, song name, duration 等資訊
		- 也有 repeat button 可切換歌曲 loop 狀態
		- 也有 PositionBar 顯示歌曲播放進度，並可點選快轉
	
	- repeat 鈕可點選

	- 播放進度列可點選


# 閱讀重點
	- 程式進入點在 boot.js
	- 觀察 DisplayContainer 取得資料，並轉手配發資料給子元件的流程
	- 觀察 Dipslay 元件，此為一個母元件(compound component)
	- 觀察 RepeatButton 元件，此為一個子元件(base component)

						
# 思考
	
	- 此架構設計是否真能實現高度可用性？
	
	- 真的需要重用元件嗎？
		- 或許複製後直接改內容最快？

	- 重用的範圍僅限於單一專案內較實際？
		- 也就是不肖想寫出可多個專案共用的萬能元件


How to use
==========

# 第一件事
	
	- 安裝相依套件

		$ npm install

# 執行程式
	
	- 啟動 local web server 
	- 訪問 http://localhost:8080

	$ gulp dev

# build 程式

	- 處理所有 js 與 css 並編譯為一份檔案

	$ gulp build

