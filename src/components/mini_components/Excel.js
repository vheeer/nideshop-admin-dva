import react from 'react';
import Workbook from 'react-excel-workbook';
import styles from './Excel.css';
//解决开关无法在表单内赋初始值问题
export default class Excel extends react.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}
    render() {
    	const { data } = this.props;
        return (
			<div className={styles.row}>
			    <Workbook filename="运单列表.xlsx" element={this.props.btn_ele}>
			      <Workbook.Sheet data={data} name="Sheet A">
			        <Workbook.Column label="编号" value="order_sn" />
			        <Workbook.Column label="寄件人姓名" value="consignor" />
			        {/*<Workbook.Column label="寄件人地址" value="shipping_address" />*/}
			        {/*<Workbook.Column label="寄件人详细地址" value="shipping_address_desc" />*/}
			        <Workbook.Column label="寄件人手机" value="shipping_mobile" />
			        {/*<Workbook.Column label="寄件人留言" value="shipping_postscript" />*/}
			        <Workbook.Column label="寄件人座机" value="shipping_telephone" />

			        <Workbook.Column label="收件人姓名" value="consignee" />
			        
			        {/*<Workbook.Column label="收件地址_省" value="deliver_province_text" />*/}
			        {/*<Workbook.Column label="收件地址_市" value="deliver_city_text" />*/}
			        {/*<Workbook.Column label="收件地址_区" value="deliver_district_text" />*/}
			        {/*<Workbook.Column label="收件地址_详细地址" value="deliver_address_desc" />*/}
			        

			        <Workbook.Column label="收件人手机" value="deliver_mobile" />
			        <Workbook.Column label="收件人座机" value="deliver_telephone" />
			        <Workbook.Column label="收件地址" value="deliver_address_all" />
			        <Workbook.Column label="物品信息" value="shipping_postscript" />


			      </Workbook.Sheet>
			    </Workbook>
			</div>
        );
    }
}