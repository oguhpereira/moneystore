/**
 * @author oguhpereira
 * Trade View
 */
import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './trade.css';
import lang from '../../languages';
import { SimpleTable } from '../SimpleTable';
import * as WalletActions from '../../store/actions/wallet';
import * as PriceActions from '../../store/actions/price';
import {
	formatMoney,
	errorSpan,
	disableOperators,
	roundString,
} from '../../utils';
import Modal from '../Modal';
import * as TradeAPI from './TradeAPI';
import {
	INSUFFICIENT_MONEY,
	INVALID_QUOTE,
	PARAM_VERYSHORT,
	INSUFFICIENT_QUANTITY,
} from '../../constants';
import BuyIcon from '../../images/buybtn.svg';
import SellIcon from '../../images/sellbtn.svg';

/**
 * @function errorValidationForm
 * @param {Element} target element form
 * @return {Boolean}
 * Validation of form fields
 */
function errorValidationForm(target) {
	let error = false;
	clearError(target);
	if (target.quantity.value <= 0) {
		target.quantity.parentElement.append(errorSpan(lang.field_require_number));
		target.quantity.className = 'form-control input-error';
		error = true;
	}

	return error;
}

/**
 * @function clearError
 * @param {Element} target element form
 * @return {Boolean}
 * clears form errors
 */
function clearError(target) {
	let clear = false;
	const coinError = target.coin_price.parentElement.querySelector(
		'span.error-small'
	);
	const quantityError = target.quantity.parentElement.querySelector(
		'span.error-small'
	);
	const priceError = target.price.parentElement.querySelector(
		'span.error-small'
	);
	if (coinError) {
		clear = true;
		coinError.remove();
		target.coin_price.className = 'form-control';
	}
	if (quantityError) {
		clear = true;
		quantityError.remove();
		target.quantity.className = 'form-control';
	}
	if (priceError) {
		clear = true;
		priceError.remove();
		target.price.className = 'form-control';
	}
	return clear;
}

/**
 * @function BuyCoin
 * @param {String} coinName
 * @param {Number} coinPrice
 * @param {Function} callback
 * @return {JSX}
 * Modal for Buy Coin
 */
function BuyCoin({ coinName, coinPrice, callback }) {
	const [coinValue, setCoinValue] = useState(coinPrice * 1);
	const [coinQuantity, setCoinQuantity] = useState(1);
	const auth = useSelector((state) => state.auth);

	function handleChangePrice(event) {
		const { target } = event || {};
		let value = roundString(target.value);
		setCoinQuantity(value);
		setCoinValue(value * coinPrice);
	}

	function handleSubmit(event) {
		event.preventDefault();
		const form = event.target;
		if (!errorValidationForm(form)) {
			const response = TradeAPI.buy(
				{
					name: form.coin.value,
					quantity: form.quantity.value,
					price: coinPrice,
				},
				auth.userHash
			);
			if (response.status === 200) {
				toast.success(lang.successful_purchase, {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				callback(response.wallet);
			} else {
				if (response.message === INSUFFICIENT_MONEY) {
					form.price.parentElement.append(errorSpan(lang.invalid_money));
					form.price.className = 'form-control input-error';
				}
				if (response.message === INVALID_QUOTE) {
					form.coin.parentElement.append(errorSpan(lang.invalid_money));
					form.coin.className = 'form-control input-error';
				}
				if (response.message === PARAM_VERYSHORT) {
					form.price.parentElement.append(
						errorSpan(lang.invalid_quantity_very_short)
					);
					form.price.className = 'form-control input-error';
				}
			}
		}
		return;
	}

	return (
		<div>
			<form onSubmit={handleSubmit} className="buy-coin" autoComplete="off">
				<p className="buy-atention">{lang.atention_buy}</p>
				<div className="form-group">
					<label className="label" htmlFor="coin">
						{lang.coin}
					</label>
					<input
						className="form-control"
						name="coin"
						type="text"
						id="coin"
						disabled
						value={coinName}
					/>
				</div>
				<div className="form-group">
					<label className="label" htmlFor="coin_price">
						{lang.price}
					</label>
					<input
						className="form-control"
						name="coin_price"
						disabled
						id="coin_price"
						type="text"
						value={`R$ ${formatMoney(coinPrice)}`}
					/>
				</div>
				<div className="form-group">
					<label className="label" htmlFor="quantity">
						{lang.how_much_you_want_buy}
					</label>
					<input
						className="form-control"
						name="quantity"
						type="number"
						id="quantity"
						value={coinQuantity}
						onChange={handleChangePrice}
						onKeyDown={disableOperators}
					/>
				</div>
				<div className="form-group">
					<label className="label" htmlFor="price">
						{lang.total}
					</label>
					<input
						className="form-control"
						name="price"
						disabled
						id="price"
						type="text"
						value={`R$ ${formatMoney(coinValue)}`}
					/>
				</div>
				<button className="btn btn-success mt-10 btn-buy">{lang.buy}</button>
			</form>
		</div>
	);
}

/**
 * @function SellCoin
 * @param {String} coinName
 * @param {Number} coinPrice
 * @param {Number} coinUserQuantity quantity coin user have.
 * @param {Function} callback
 * @return {JSX}
 * Modal for Sell Coin
 */
function SellCoin({ coinName, coinPrice, coinUserQuantity, callback }) {
	const [coinValue, setCoinValue] = useState(coinPrice * 1);
	const [coinQuantity, setCoinQuantity] = useState(1);
	const auth = useSelector((state) => state.auth);

	function handleChangePrice(event) {
		const { target } = event || {};
		let value = roundString(target.value);
		setCoinQuantity(value);
		setCoinValue(value * coinPrice);
	}

	function handleSubmit(event) {
		event.preventDefault();
		const form = event.target;
		if (!errorValidationForm(form)) {
			const response = TradeAPI.sell(
				{
					name: form.coin.value,
					quantity: form.quantity.value,
					price: coinPrice,
				},
				auth.userHash
			);
			if (response.status === 200) {
				toast.success(lang.successful_sale, {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				callback(response.wallet);
			} else {
				if (response.message === INSUFFICIENT_QUANTITY) {
					form.quantity.parentElement.append(errorSpan(lang.invalid_quantity));
					form.quantity.className = 'form-control input-error';
				}
				if (response.message === INVALID_QUOTE) {
					form.coin.parentElement.append(errorSpan(lang.invalid_money));
					form.coin.className = 'form-control input-error';
				}
				if (response.message === PARAM_VERYSHORT) {
					form.price.parentElement.append(
						errorSpan(lang.invalid_quantity_very_short)
					);
					form.price.className = 'form-control input-error';
				}
			}
		}
		return;
	}

	return (
		<div>
			<form onSubmit={handleSubmit} className="buy-coin" autoComplete="off">
				<p className="buy-atention">{lang.atention_sell}</p>
				<div className="form-group">
					<label className="label" htmlFor="coin">
						{lang.coin}
					</label>
					<input
						className="form-control"
						name="coin"
						type="text"
						id="coin"
						disabled
						value={coinName}
					/>
				</div>
				<div className="form-group">
					<label className="label" htmlFor="coin_price">
						{lang.price}
					</label>
					<input
						className="form-control"
						name="coin_price"
						disabled
						id="coin_price"
						type="text"
						value={`R$ ${formatMoney(coinPrice)}`}
					/>
				</div>
				<div className="form-group">
					<label className="label" htmlFor="unit">
						{lang.quantity_you_have}
					</label>
					<input
						className="form-control"
						name="unit"
						type="number"
						id="unit"
						value={coinUserQuantity}
						disabled
					/>
				</div>
				<div className="form-group">
					<label className="label" htmlFor="quantity">
						{lang.how_much_you_want_sell}
					</label>
					<input
						className="form-control"
						name="quantity"
						type="number"
						id="quantity"
						value={coinQuantity}
						onChange={handleChangePrice}
					/>
				</div>
				<div className="form-group">
					<label className="label" htmlFor="price">
						{lang.total}
					</label>
					<input
						className="form-control"
						name="price"
						disabled
						id="price"
						type="text"
						value={`R$ ${formatMoney(coinValue)}`}
					/>
				</div>
				<button className="btn btn-success mt-10 btn-buy">{lang.sell}</button>
			</form>
		</div>
	);
}

/**
 * @function Trade
 * @param {Object} wallet
 * @param {Object} price
 * @param {Function} setWallet
 * @returns {JSX}
 */
function Trade({ wallet, price, setWallet }) {
	const [buyCoin, setBuyCoin] = useState(null);
	const [sellCoin, setSellCoin] = useState(null);

	/**
	 * @function TableAction
	 * @param {String} name
	 * @param {Number} id
	 * @param {Boolean} isSell
	 * @param {Number} quantity
	 * @returns {JSX}
	 */
	function TableAction({ name, id, isSell, quantity = 0 }) {
		function handleShowBuyModal() {
			if (isSell) {
				setSellCoin({
					coinName: name,
					coinPrice: price[name.toLowerCase()],
					coinUserQuantity: quantity,
				});
			} else {
				setBuyCoin({
					coinName: name,
					coinPrice: price[name.toLowerCase()],
				});
			}
		}
		return (
			<span className="action-button" onClick={() => handleShowBuyModal(name)}>
				{isSell ? (
					<div>
						<img src={SellIcon} alt={lang.sell} title={lang.sell} />
						<span>{lang.sell}</span>
					</div>
				) : (
					<div>
						<img src={BuyIcon} alt={lang.buy} title={lang.buy} />
						<span>{lang.buy}</span>
					</div>
				)}
			</span>
		);
	}

	const buyTable = {
		head: [lang.title, lang.value_in_reais, lang.buy],
		keys: ['name', 'price', 'action'],
		data: [
			{
				name: 'Biticoin',
				price: `R$ ${formatMoney(price.bitcoin)}`,
				action: <TableAction name="Bitcoin" />,
			},
			{
				name: 'Brita',
				price: `R$ ${formatMoney(price.brita)}`,
				action: <TableAction name="Brita" />,
			},
		],
	};

	/**
	 * @function dataSellTable
	 * @param {Array} coins
	 * @param {Object} price
	 * @returns {Array}
	 */
	function dataSellTable(coins, price) {
		return coins.reduce((accumulator, currentValue) => {
			if (currentValue.quantity) {
				return accumulator.concat({
					name: currentValue.name,
					unit: currentValue.quantity,
					price: `R$ ${formatMoney(
						currentValue.quantity * price[currentValue.name.toLowerCase()]
					)}`,
					action: (
						<TableAction
							name={currentValue.name}
							quantity={currentValue.quantity}
							isSell
						/>
					),
				});
			}
			return accumulator;
		}, []);
	}

	const sellTable = {
		head: [lang.title, lang.unit, lang.value_in_reais, lang.sell],
		keys: ['name', 'unit', 'price', 'action'],
		data: dataSellTable(wallet.coins, price),
	};

	const headerModal = sellCoin
		? {
				title: lang.sell,
				description: lang.select_quantity_you_want_sell,
		  }
		: {
				title: lang.buy,
				description: lang.select_quantity_you_want_buy,
		  };

	/**
	 * @function TableAction
	 * @param {Object} wallet
	 */
	function updateWallet(wallet) {
		setWallet(wallet);
		setBuyCoin(null);
		setSellCoin(null);
	}

	return (
		<div className="trade">
			<h1 className="title">{lang.tradearea}</h1>
			<SimpleTable
				title={lang.buy}
				head={buyTable.head}
				content={buyTable.data}
				keys={buyTable.keys}
			/>
			<SimpleTable
				title={lang.sell}
				head={sellTable.head}
				content={sellTable.data}
				keys={sellTable.keys}
			/>
			<Modal
				header={headerModal}
				visible={sellCoin || buyCoin}
				callback={() => {
					setBuyCoin(null);
					setSellCoin(null);
				}}
				hasCloseArea
			>
				{sellCoin ? (
					<SellCoin {...sellCoin} callback={(wallet) => updateWallet(wallet)} />
				) : (
					<BuyCoin {...buyCoin} callback={(wallet) => updateWallet(wallet)} />
				)}
			</Modal>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover={false}
			/>
		</div>
	);
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	price: state.price,
	wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ ...WalletActions, ...PriceActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Trade);
