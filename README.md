# PROLUZE — site

Site estático (index.html) + uma função que envia os contatos por e-mail (api/lead.js).

## 1. Antes de publicar (1 minuto)
O WhatsApp já está configurado em `index.html` (variável `WA`). Para mudar, edite essa linha.
Exemplo: `var WA="5521999999999";`

## 2. GitHub
1. github.com > New repository > nome `proluze-site` > Create.
2. "uploading an existing file" > arraste TODOS os arquivos desta pasta (inclusive a pasta `api`) > Commit.

## 3. E-mail dos contatos (Resend, grátis)
1. Crie conta em resend.com **usando o e-mail agenciaproluze@gmail.com**.
2. API Keys > Create API Key > copie a chave.
(Com o remetente padrão `onboarding@resend.dev`, o Resend só entrega no e-mail da própria conta. Por isso use o agenciaproluze@gmail.com. Quando tiver domínio próprio, verifique-o no Resend e defina `LEAD_FROM_EMAIL`.)

## 4. Vercel
1. vercel.com > Add New > Project > importe o repositório `proluze-site`.
2. Antes de Deploy, abra Environment Variables e crie:
   - `RESEND_API_KEY` = a chave do passo 3
   - `LEAD_TO_EMAIL` = agenciaproluze@gmail.com
3. Deploy. Depois, Settings > Domains para ligar seu domínio.

## 5. Teste
Abra o site no celular, preencha uma capa e o diagnóstico com seus próprios dados. O e-mail deve chegar em segundos.
Cada contato também aparece nos logs da Vercel (Project > Logs, busca por LEAD).

## Para editar depois
- Textos e cases: `index.html`.
- Cases (vídeos): a página "Cases" está vazia de propósito. Quando tiver os vídeos, peça pra montar a galeria.

## Cases (vídeos)
1. Grave em vertical (9:16), 15 a 30 s, MP4 (H.264), até ~8 MB cada.
2. No GitHub, crie a pasta `videos` e envie os arquivos.
3. No `index.html`, procure `var CASES=[];` e preencha, por exemplo:
   `var CASES=[{src:"/videos/case1.mp4",t:"Nome do cliente",d:"O que mudou, em uma frase"}];`
4. Salve (Commit). A galeria aparece sozinha e o aviso "em breve" some.

## Anúncios e métricas
No `index.html`, preencha `GA_ID` (Google Analytics) e `PIXEL_ID` (Meta). Vazio = desligado.
Eventos medidos: visita às páginas, contato enviado (lead) e cliques no WhatsApp.
