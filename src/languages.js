const ptBR = {
	login: 'Área de Login',
	email: 'E-mail',
	register: 'Registrar',
	username: 'Nome do Usuário',
	password: 'Senha',
	next: 'Avançar',
	fieldempty: 'Este campo não pode ficar vazio',
	email_already_registered: 'E-mail já cadastrado',
	unexpected_error: 'Ocorreu um erro inesperado',
	user_not_found: 'Usuário não encontrado',
	password_error: 'Senha invalida',
	logo: 'Money Store',
	help: 'Ajuda',
	tradearea: 'Área de Troca',
	view_more: 'Exibir Mais',
	your_wallet: 'Sua Carteira',
	money_avaible: 'Dinheiro Disponível',
	your_coins: 'Suas Moedas',
	total_invested: 'Total Investido',
	latest_operations: 'Últimas operações',
	see_complete_extract: 'Ver Extrato Completo',
	buy: 'Comprar',
	sell: 'Vender',
	value_in_reais: 'Valor em Reais',
	title: 'Título',
	total: 'Total',
	unit: 'Unidades',
	select_quantity_you_want_buy: 'Selecione a quantidade que deseja comprar',
	select_quantity_you_want_sell: 'Selecione a quantidade que deseja vender',
	how_much_you_want_buy: 'Quanto deseja comprar?',
	how_much_you_want_sell: 'Quanto deseja vender?',
	how_much_you_want_trade: 'Quanto deseja trocar?',
	coin: 'Moeda',
	atention_buy:
		'Atenção, ao clicar em comprar você esta confirmando a compra desta quantia em moedas',
	atention_sell:
		'Atenção, ao clicar em vender você esta confirmando a venda desta quantia',
	field_require_number: 'Você deve informar um número maior que 0',
	price: 'Preço',
	invalid_money:
		'Você não tem este dinheiro para a compra. Diminua o valor e tente novamente',
	invalid_quote: 'Sua moeda recebeu outra cotação',
	invalid_quantity:
		'Você não tem essa quantia disponivel para venda. Diminua o valor e tente novamente',
	invalid_quantity_very_short:
		'Para finalizar a operação é necessario que o total seja maior que R$ 1,00',
	quantity_you_have: 'Quantidade que você tem',
	successful_sale: 'Venda bem sucedida',
	successful_purchase: 'Compra  bem sucedida',
	successful_trade: 'Troca bem sucedida',
	trade: 'Trocar',
	from: 'De',
	to: 'Para',
	quantity: 'Quantidade',
	type: 'Tipo',
	status: 'Status',
	date: 'Data',
	complete_extract: 'Extrato Completo',
	extract: 'Extrato',
	print: 'Imprimir',
	dashboard: 'Dashboard',
	last_updated: 'Última Atualização',
	logout: 'Logout',
};

const enUS = {
	login: 'Login',
	email: 'E-mail',
	register: 'Register',
	username: 'Username',
	password: 'Password',
	next: 'Next',
	fieldempty: 'This field cannot be empty',
	email_already_registered: 'E-mail already registered',
	unexpected_error: 'An unexpected error has occurred',
	user_not_found: 'User not found',
	password_error: 'Invalid Password',
	logo: 'Money Store',
	help: 'Help',
	myaccount: 'My Account',
	tradearea: 'Trade Area',
	view_more: 'View More',
	your_wallet: 'Your Wallet',
	money_avaible: 'Money Avaible',
	your_coins: 'Your Coins',
	total_invested: 'Total Invested',
	latest_operations: 'Latest operations',
	see_complete_extract: 'See Complete Extract',
	buy: 'Buy',
	sell: 'Sell',
	value_in_reais: 'Value in Reais',
	title: 'Title',
	total: 'Total',
	unit: 'Unit',
	select_quantity_you_want_buy: 'Select the quantity you want to buy',
	select_quantity_you_want_sell: 'Select the quantity you want to sell',
	how_much_you_want_buy: 'How much do you want to buy?',
	how_much_you_want_sell: 'How much do you want to sell?',
	how_much_you_want_trade: 'How much do you want to trade?',
	coin: 'Coin',
	atention_buy:
		'Attention, by clicking on buy you are confirming the purchase of this amount in coins',
	atention_sell:
		'Attention, by clicking on sell, you confirm the sale of this quantity',
	field_require_number: 'You must enter a number greater than 0',
	price: 'Price',
	invalid_money:
		'You do not have that money to buy. Decrease the value and try again',
	invalid_quote: 'Your currency received another quote',
	invalid_quantity:
		'You do not have this amount available for sale. Decrease the value and try again',
	invalid_quantity_very_short:
		'To complete the operation, the total must be greater than R$ 1,00',
	quantity_you_have: 'Quantity you have',
	successful_sale: 'Successful sale',
	successful_purchase: 'Successful purchase',
	successful_trade: 'Successful trade',
	trade: 'Trade',
	from: 'From',
	to: 'To',
	quantity: 'Quantity',
	type: 'Type',
	status: 'Status',
	date: 'Date',
	complete_extract: 'Complete extract',
	extract: 'Extract',
	print: 'Print',
	dashboard: 'Dashboard',
	last_updated: 'Last Updated',
	logout: 'Logout',
};

const lang = navigator.language === 'pt-BR' ? ptBR : enUS;

export default { ...lang };
