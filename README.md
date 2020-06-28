# Web Comics

<!--- Alguns exemplos. Veja https://shields.io para outros escudos customizavéis. Convém incluir dependências, status do projeto e informações da licença aqui --->

![GitHub repo size](https://img.shields.io/github/repo-size/herlanassis/web-comics)
![GitHub contributors](https://img.shields.io/github/contributors/herlanassis/web-comics)
![GitHub stars](https://img.shields.io/github/stars/herlanassis/web-comics?style=social)
![GitHub forks](https://img.shields.io/github/forks/herlanassis/web-comics?style=social)
![GitHub forks](https://img.shields.io/github/issues-raw/herlanassis/web-comics?style=social)
![Twitter Follow](https://img.shields.io/twitter/follow/herlanassis?style=social)

Web Comics é uma `ferramenta` que permite aos `leitores de HQ` extrair e ler `várias tirinhas` em um único lugar.

O foco deste projeto é mostar, de forma exagerada, como é bom ler várias tiras (muitas mesmo), sem ser bombardiados por propagandas ou ter que navegar entre vários sites.

Neste projeto, foi utilizados algumas tiras brasileiras, para consultar a fonte basta [acessar aqui](https://github.com/HerlanAssis/web-comics/tree/master/comics/recipes).

# Atenção

Este projeto não tem intenção alguma de lucrar com o trabalho alheio ou violar qualquer direito.

![](web-comics.gif)

## Pré-requisitos

Antes de executar o projeto, verifique se você atendeu aos seguintes requisitos:

- Você instalou a versão mais recente do `docker`?
- Você instalou a versão mais recente do `docker-compose`?

## Executando o web-comics

Você pode escolher entre:

Para executar o web-comics, siga SOMENTE um destes passos:

### 1 - Nuvem (Serviço de container gratuito)

[![Try in PWD](https://raw.githubusercontent.com/play-with-docker/stacks/master/assets/images/button.png)](https://labs.play-with-docker.com/?stack=https://raw.githubusercontent.com/HerlanAssis/web-comics/master/stack.yml)

### 2 - Localhost (Bare Metal)

Linux, Windows ou macOS:

```shell
git clone https://github.com/HerlanAssis/web-comics;
cd web-comics;
docker-compose up -d --build;
```

## Utilizando web-comics

Para usar web-comics abra `localhost` no seu navegador OU acessar no link da porta 80 (para quem optou pela opção 1 nos passos anteriores).

## Contribuindo para web-comics

Para contribuir com web-comics, siga estes passos:

1. Faça o Fork desse repositório.
2. Crie uma branch: `git checkout -b <feature_name>`.
3. Faça suas mudanças e comite para: `git commit -m '<commit_message>'`
4. Push para a branch de origem: `git push origin web-comics/<location>`
5. crie um pull request.

Como alternativa, consulte a documentação do GitHub em [criando uma pull request](https://help.github.com/pt/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## Contribuidores

- [@herlanassis](https://github.com/herlanassis)

## Contato

Se você quiser entrar em contato comigo, utilize o email: herlanassis@gmail.com.

## License

<!--- Se você não tiver certeza de qual licença aberta usar, consulte https://choosealicense.com --->

Este projeto usa a seguinte licença: [GNU GPLv3](https://spdx.org/licenses/GPL-3.0.html).
