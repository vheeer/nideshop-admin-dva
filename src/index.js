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
app.model(require('./models/attribute').default);
app.model(require('./models/goods_attribute').default);
app.model(require('./models/goods_issue').default);
app.model(require('./models/related_goods').default);

app.model(require('./models/prodcut').default);
app.model(require('./models/specification').default);
app.model(require('./models/goods_specification').default);

app.model(require('./models/order').default);
app.model(require('./models/order_goods').default);

app.model(require('./models/brand').default);
app.model(require('./models/tag').default);
app.model(require('./models/topic').default);
app.model(require('./models/ad').default);
app.model(require('./models/channel').default);
app.model(require('./models/feedback').default);
app.model(require('./models/comment').default);

app.model(require('./models/cash').default);
app.model(require('./models/distribute_apply').default);
app.model(require('./models/distribute_commision').default);

app.model(require('./models/user').default);
app.model(require('./models/address').default);

app.model(require('./models/others').default);


// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
