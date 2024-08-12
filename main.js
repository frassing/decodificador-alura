const text_area = document.getElementById('texto_usuario');
const caixa_saida = document.querySelector('.decodificador__saida__texto');	
const btn_encriptar = document.getElementById('entrada__botao_encriptar');
const btn_desencriptar = document.getElementById('entrada__botao_desencriptar');
const btn_copiar = document.getElementById('saida__botao_copiar');

// Verifica se deve exibir a ilustração e mensagem inicial ou o botão copiar.
function verificar_exibicao_saida() {
	const saida_img = document.getElementById('saida_img');
	const saida_texto_temp = document.getElementById('saida_texto_temporario');
	if (!text_area.value) {
		saida_img.classList.remove('display_none');
		saida_texto_temp.classList.remove('display_none');
		btn_copiar.classList.add('display_none');
		text_area.focus();
	} else if (saida_texto_temp.style.display != 'none') {
		saida_img.classList.add('display_none');
		saida_texto_temp.classList.add('display_none');
		btn_copiar.classList.remove('display_none');
	}
	btn_copiar.innerHTML = 'Copiar';
}

// Recebe uma string e adiciona ao elemento HTML reservado para exibir o texto do usuário
function exibir_texto_na_tela(string) {
	verificar_exibicao_saida();
	const elem_p = document.getElementById('saida_texto_usuario');
	elem_p.innerHTML = string;
}

// Armazena o input do usuário, transforma em minúsculo e faz uma busca na string completa para substituir as vogais pela criptografia correspondente, depois passa a string encriptada para ser exibida na tela e limpa o campo do input
function encriptar_texto() {
	const matriz_cripto = [['e', 'enter'], ['i', 'imes'], ['a', 'ai'], ['o', 'ober'], ['u', 'ufat']];
	let str_encriptar = text_area.value;
	str_encriptar = str_encriptar.toLowerCase();
	
	for (let i = 0; i < matriz_cripto.length; i++) {
		if (str_encriptar.includes(matriz_cripto[i][0])) {
			str_encriptar = str_encriptar.replaceAll(matriz_cripto[i][0], matriz_cripto[i][1]);
			// ver como: replaceAll(localização_vogal, localização_cripto)
		}
	}

	exibir_texto_na_tela(str_encriptar);
	text_area.value = '';
}

// Exatamente o mesmo processo de encriptar_texto, mas a busca é feita pelos trechos criptografados para substituir pelas vogais correspondentes
function desencriptar_texto() {
	const matriz_cripto = [['e', 'enter'], ['i', 'imes'], ['a', 'ai'], ['o', 'ober'], ['u', 'ufat']];
	let str_desencriptar = text_area.value;
	str_desencriptar = str_desencriptar.toLowerCase();

	for (let i = 0; i < matriz_cripto.length; i++) {
		if (str_desencriptar.includes(matriz_cripto[i][1])) {
			str_desencriptar = str_desencriptar.replaceAll(matriz_cripto[i][1], matriz_cripto[i][0]);
		}
	}

	exibir_texto_na_tela(str_desencriptar);
	text_area.value = '';
}

// Pega o elemento que exibe o texto de saida, passa o conteúdo dele para o clipboard do usuário e o botão uma indica o status de copiado
async function copiar_texto() {
	const texto_saida = document.getElementById('saida_texto_usuario');
	await navigator.clipboard.writeText(texto_saida.innerHTML);
	btn_copiar.innerHTML ='Copiado!';
}

btn_encriptar.addEventListener('click', encriptar_texto);
btn_desencriptar.addEventListener('click', desencriptar_texto);
btn_copiar.addEventListener('click', copiar_texto);