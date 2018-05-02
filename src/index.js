import dva from 'dva';
import './index.css';
import menuConfig from './menuConfig.json';

// 1. Initialize
const app = dva({
    initialState: {
    	page: { 
		    menuConfig,
		    openDefaultKey: "",
		    title: "主页"
		}
    }
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/page').default);
app.model(require('./models/account').default);

app.model(require('./models/goods').default);
app.model(require('./models/order').default);
app.model(require('./models/brand').default);
app.model(require('./models/topic').default);
app.model(require('./models/user').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
