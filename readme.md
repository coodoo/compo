
React container pattern POC
===========================

# 程式說明
	
	![](https://raw.githubusercontent.com/coodoo/compo/master/mock.png)

	- 籍由模擬一個音樂播放器的顯示面板來驗証 container pattern 如何確保元件的 re-usability

	- 程式進入點在 boot.js
		- 觀察 DisplayContainer 取得資料，並轉手配發資料給子元件的流程
		- 觀察 Dipslay 元件，此為一個 compound component (因為它下面還包了其它元件)
		- 觀察 RepeatButton 元件，此為一個 base component (因為它下面沒包其它元件)
	
	- UI 各部件說明
		- DisplayContainer 為 container，負責從 store 取得資料與建立 actionMap
		- Display 為顯示面板主體元件
			- 內有 artist, song name, duration 等資訊
			- 也有 RepeatButton 可切換歌曲 loop 狀態
			- 也有 PositionBar 顯示歌曲播放進度，並可點選快轉

# 如何執行

	- 安裝相依套件

		$ npm install

	- 執行程式
		
		$ gulp dev

	- 訪問 http://localhost:8080

# 如何 build

	$ gulp build


# 實驗重點
	
	- container 如何增加元件重用性(re-usability)

	- 讓元件與 business logic 完全分離，進而成為 passive part

	- 避免子元件內部直接操作 action 以免對外界產生緊密相依性(decoupling)

	- 未來能與 Relay 之 container 結合，並優化 write 流程以確保元件可重用性


# container 角色說明
	
	- 一律內部從 store 取得資料後存入 this.state 
		- 不透過 props 接收外部資料
	
	- 建立 actionMap{} 傳給下屬元件操作，例如 this.onClick callback

	- container 負責資料的 I/O
		- 對內提供 store 資料給子元件
		- 對外介接 actionCreator 之各種操作

	- container 下可有 nested container
		- nested container 一樣是內部從 store 取資料

	- container 為最小邏輯單位，其下只應包含最緊密需求的子元件
		- 因為每次 store change 事件後會觸發下屬所有元件都重繪
		- 因此要盡量減少跟著 re-render 的元件數量
		- 簡單說：setState() 後影響到的子元件越少越好

	- container 無法 reuse
		- 因為它緊密相依外部 actionCreator 與 store 
		- 但可複製後改寫以適應不同專案需求	

# component 角色說明

	- 元件下可有多層次 nested component
	
	- 元件接收的 props 有三種類型: data, callback, actions

	- 所有元件都在 propTypes{} 內列出自已需要的 prop 與其 type，這就是一份契約
		- https://facebook.github.io/react/docs/reusable-components.html
	
	- 從 reuse 的角度來說，將來重用時不可改寫元件內容，只能透過 props 傳入資料來操作它

	- 如要改寫元件功能，只能透過 extends 的方式來覆寫

	- 元件可 reuse，但要記得帶走相依的下屬元件
		- 例如 Display 相依 RepeatButton 與 PositionBar 兩元件

	- 元件可任意被包入其它元件而成為 nested component，只要確保有傳入該元件所需 props 即可

	- 元件只對直屬第一層元件負責(傳入 props)

	- 元件調用 callback 時為何要傳出資料？
		- 例如元件內是個下拉選單，用戶選了新資料，此時一定要靠元件將最新選取的值傳出來
		- 又例如 progress bar，用戶調整了新進度，也要靠元件傳出最新的值

# 提升元件效能的技巧

	- 例子
		<Chrome>
		  <MainApp>  
		    <FlexLayout>
		      <ScrollArea>
		        <SongDisplayContainer />
		      </ScrollArea>
		    </FlexLayout>
		    </Chrome>
		  </MainApp>
		<Chrome>	

	- Chrome, MainApp, FlexLayout, ScrollArea 這四層稱為 structural or interactive component
	- 這四者永遠不需重繪
	- 只有最下層的 SongDisplayContainer 因為跟 store 直接關聯因此會觸發 re-render
	- 這樣的架構可減少每次 re-render 時受波及的元件數量，因而提升效能

# propTypes 語法參考

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

# 進階思考 ("devil's advocate")
	
	- 或許 css 就很好用？
		- 與其做 <MyButton /> 元件
		- 不如做 <div classname="myButton" /> 樣式控制更快？
		- 除非這個元件內部要封裝複雜的行為，例如像 select2 或 datagrid 這種元件就有封裝價值

	- 真的需要重用元件嗎？
		- 或許複製後直接改內容最快？
		- 因為 web 的世界就是由一堆 <div> 元素組成，為了重用而去封裝元件花的成本如何 justify?

	- 重用的代價是什麼？
		- 根據以往 flex 的經驗，一個可高度重用的元件，開發時間往往極長
		- 因為要考量各種可能 use case 而提供不同的 props 接口與 internal logics
		- 最慘的是永遠無法滿足各種不同需求，因此最後還是要 extends or monkey patch

	- 重用的範圍僅限於單一專案內較實際？
		- 也就是不肖想寫出可多個專案共用的萬能元件

# 感謝

特別感謝 [Hedger Wang](https://github.com/hedgerwang) 與 [Bill Fisher](https://twitter.com/fisherwebdev) 幫忙 code review 並提供改善建議。

	
						

