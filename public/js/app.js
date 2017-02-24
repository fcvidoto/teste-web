


//  seta direita
$('.seta-direita').on('click', (e) => {
	e.preventDefault();
	let pagina = parseInt(window.location.href.split("-").pop()) + 1;
	if (pagina === '' || pagina === 0) return;

	window.location.href = '/pag-' + pagina;
});


//  seta esquerda
$('.seta-esquerda').on('click', (e) => {
	e.preventDefault();
	let pagina = parseInt(window.location.href.split("-").pop()) - 1;
	if (pagina === '' || pagina === 0) return;

	window.location.href = '/pag-' + pagina;
});

//  botao go
$('.go').on('click', (e) => {
	e.preventDefault();
	let pagina = $('.select-page').val();
	if (pagina === '') return;

	window.location.href = '/pag-' + pagina;
});