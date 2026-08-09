import type { LocaleBundle } from '../../types';
import { buildWave1Bundle } from './build';

export const ptBrBundle: LocaleBundle = buildWave1Bundle('pt-br', {
  htmlLang: 'pt-BR',
  ogLocale: 'pt_BR',
  nav: {
    home: 'Início',
    sign: 'Assinar PDF',
    tools: 'Ferramentas PDF',
    privacy: 'Privacidade',
    guides: 'Guias',
    openTool: 'Usar esta ferramenta no navegador',
    relatedTools: 'Páginas relacionadas',
    howTo: 'Como usar',
    whatItDoes: 'O que esta ferramenta faz',
    localProcessing: 'Como funciona o processamento local',
    limitations: 'Limitações',
    faq: 'Perguntas frequentes',
    enableJs:
      'Ative o JavaScript para editar PDFs localmente no navegador. Não é preciso enviar o arquivo depois que os recursos da página forem carregados.',
    published: 'Publicado',
    updated: 'Última atualização',
    verified: 'Última verificação',
    howWeVerified: 'Como verificamos',
  },
  home: {
    title: 'Ferramentas PDF privadas — Assinar, unir e comprimir | Sign X PDF',
    description:
      'Assine, una, comprima, reordene e exclua páginas de PDF no navegador. O PDF é processado no seu dispositivo, sem envio aos servidores da Sign X PDF.',
    h1: 'Assine e edite PDFs com privacidade no navegador',
    answerFirst:
      'A Sign X PDF permite adicionar uma assinatura visível e fazer operações comuns em PDF direto no navegador. O arquivo é processado no seu dispositivo e não é enviado aos servidores da Sign X PDF. Não é preciso criar conta. Ao terminar, salve o PDF atualizado no seu aparelho.',
    privacyNote:
      'Seu PDF é processado localmente no navegador e não é enviado aos servidores da Sign X PDF. Como em qualquer site, os recursos comuns da página (HTML, scripts, fontes) ainda são baixados da rede.',
    whatItDoes:
      'Escolha uma ferramenta para assinar, unir, comprimir, reordenar páginas ou excluir páginas. Cada página explica o fluxo e carrega o editor só quando você usa.',
    howTo: [
      'Escolha uma ferramenta, como Assinar PDF ou Unir PDF.',
      'Abra o arquivo com o seletor da página (ou arraste e solte quando disponível).',
      'Conclua as edições no navegador.',
      'Salve o resultado no seu dispositivo.',
    ],
    localProcessing:
      'Depois que os recursos do app carregam, a leitura, a renderização e a exportação usam APIs do navegador e bibliotecas do cliente. O PDF selecionado não é enviado aos servidores da Sign X PDF para processamento.',
    limitations: [
      'É necessário um navegador moderno com JavaScript para editar.',
      'PDFs muito grandes podem ficar mais lentos em dispositivos com pouca memória.',
      'O processamento local não protege contra malware no dispositivo nem extensões maliciosas do navegador.',
    ],
    faq: [
      {
        question: 'Meu PDF é enviado para algum servidor?',
        answer:
          'Não. A Sign X PDF foi feita para processar o PDF selecionado no seu navegador, não para enviá-lo aos servidores da Sign X PDF para conversão ou armazenamento.',
      },
      {
        question: 'Preciso de uma conta?',
        answer: 'Não é necessário ter conta para usar as ferramentas no navegador.',
      },
      {
        question: 'O que acontece quando eu termino?',
        answer:
          'Você salva o PDF atualizado no dispositivo. Neste fluxo, a Sign X PDF não mantém uma cópia do arquivo no servidor.',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: 'Assinar PDF' },
      { pathSegment: 'merge-pdf', label: 'Unir PDF' },
      { pathSegment: 'compress-pdf', label: 'Comprimir PDF' },
      { pathSegment: 'privacy', label: 'Privacidade' },
    ],
  },
  sign: {
    title: 'Assinar PDF no navegador — Assinatura visível | Sign X PDF',
    description:
      'Adicione uma assinatura visível a um PDF no navegador. Desenhe, digite ou coloque uma imagem de assinatura localmente — sem enviar o PDF aos servidores da Sign X PDF.',
    h1: 'Assinar um PDF no navegador',
    answerFirst:
      'Com a Sign X PDF você adiciona uma assinatura visível a um PDF direto no navegador. O documento é processado no seu dispositivo, em vez de ser enviado aos servidores da Sign X PDF. Não é preciso conta. Ao finalizar, salve o PDF assinado no seu aparelho.',
    privacyNote:
      'Seu PDF é processado localmente no navegador e não é enviado aos servidores da Sign X PDF.',
    whatItDoes:
      'Crie uma assinatura desenhando, digitando, enviando uma imagem ou usando a câmera quando disponível; posicione na página e exporte um PDF novo.',
    howTo: [
      'Abra um PDF ou uma imagem compatível.',
      'Crie ou escolha uma assinatura (desenhar, digitar, imagem ou câmera).',
      'Posicione e redimensione a assinatura na página.',
      'Salve o PDF assinado no seu dispositivo.',
    ],
    localProcessing:
      'A criação da assinatura e a exportação do PDF rodam com bibliotecas do cliente no navegador, depois que os recursos da página carregam.',
    limitations: [
      'Isso adiciona uma aparência de assinatura visível, não uma assinatura digital criptográfica com certificado.',
      'Por si só não cria trilha de auditoria, verificação de identidade nem garantia de validade jurídica.',
      'PDFs criptografados podem precisar da senha de abertura antes da edição.',
    ],
    faq: [
      {
        question: 'Isso é uma assinatura digital com certificado?',
        answer:
          'Não. A Sign X PDF coloca uma assinatura visível (desenhada, digitada ou por imagem). Não aplica assinatura criptográfica com certificado, carimbo de tempo nem verificação de assinatura.',
      },
      {
        question: 'O PDF precisa ser enviado para assinar?',
        answer:
          'Não. A assinatura foi projetada para rodar localmente no navegador. Os recursos comuns do site ainda são baixados pela rede.',
      },
      {
        question: 'Posso usar uma foto da minha assinatura?',
        answer:
          'Sim. Você pode enviar uma imagem da assinatura ou capturá-la quando o navegador permitir acesso à câmera.',
      },
      {
        question: 'Desenhar em um PDF é o mesmo que assinatura digital?',
        answer:
          'Não. Desenhar coloca uma marca visível. Uma assinatura digital com certificado usa criptografia e um certificado digital. A Sign X PDF só coloca assinaturas visíveis.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'Unir arquivos PDF' },
      { pathSegment: 'compress-pdf', label: 'Comprimir um PDF' },
      { pathSegment: 'reorder-pdf', label: 'Reordenar páginas' },
      { pathSegment: 'privacy', label: 'Privacidade e processamento local' },
    ],
  },
  merge: {
    title: 'Unir PDF localmente no navegador — sem enviar arquivos | Sign X PDF',
    description:
      'Combine vários PDFs em um único arquivo no navegador. A união é local — seus arquivos não são enviados aos servidores da Sign X PDF.',
    h1: 'Unir arquivos PDF no navegador',
    answerFirst:
      'Use a Sign X PDF para unir vários PDFs em um só documento no navegador. Os arquivos são processados no seu dispositivo, sem envio aos servidores da Sign X PDF. Não é preciso conta. Salve o PDF unido ao terminar.',
    privacyNote:
      'Seu PDF é processado localmente no navegador e não é enviado aos servidores da Sign X PDF.',
    whatItDoes:
      'Carregue um ou mais PDFs (e imagens compatíveis), organize as páginas e exporte um único PDF combinado.',
    howTo: [
      'Abra o espaço de trabalho de unir PDF abaixo.',
      'Adicione os arquivos PDF que deseja combinar.',
      'Reordene as páginas se precisar.',
      'Salve o PDF unido no seu dispositivo.',
    ],
    localProcessing:
      'A união usa bibliotecas PDF do cliente no navegador após o carregamento dos recursos. Os arquivos selecionados não são enviados aos servidores da Sign X PDF para união.',
    limitations: [
      'Os limites de memória do navegador valem para arquivos muito grandes ou muitos arquivos de uma vez.',
      'Alguns PDFs criptografados exigem senha antes de poderem ser unidos.',
    ],
    faq: [
      {
        question: 'Posso unir mais de dois PDFs?',
        answer: 'Sim. Adicione vários arquivos no espaço de trabalho e exporte um único PDF combinado.',
      },
      {
        question: 'Meus arquivos são enviados para unir?',
        answer: 'Não. O processamento de união foi feito para permanecer no navegador.',
      },
    ],
    related: [
      { pathSegment: 'reorder-pdf', label: 'Reordenar páginas do PDF' },
      { pathSegment: 'delete-pdf-pages', label: 'Excluir páginas do PDF' },
      { pathSegment: 'compress-pdf', label: 'Comprimir PDF' },
      { pathSegment: 'privacy', label: 'Privacidade' },
    ],
  },
  compress: {
    title: 'Comprimir PDF no navegador | Sign X PDF',
    description:
      'Reduza o tamanho de um PDF no navegador. A compressão roda localmente, sem enviar o arquivo aos servidores da Sign X PDF.',
    h1: 'Comprimir um PDF no navegador',
    answerFirst:
      'Comprima um PDF direto no navegador com a Sign X PDF. O processamento fica no seu dispositivo, em vez de enviar o arquivo aos servidores da Sign X PDF. Não é preciso conta. Salve o PDF menor quando terminar.',
    privacyNote:
      'Seu PDF é processado localmente no navegador e não é enviado aos servidores da Sign X PDF.',
    whatItDoes:
      'Abra um PDF, escolha um tamanho-alvo quando disponível, execute a compressão no navegador e salve o resultado.',
    howTo: [
      'Abra um PDF no espaço de trabalho.',
      'Escolha as configurações de compressão.',
      'Execute a compressão e confira o tamanho obtido.',
      'Salve o PDF comprimido.',
    ],
    localProcessing:
      'A compressão usa processamento no dispositivo após o carregamento dos recursos da ferramenta. O PDF não é enviado aos servidores da Sign X PDF para compressão.',
    limitations: [
      'O quanto o arquivo pode encolher depende do conteúdo (digitalizações versus texto).',
      'Compressão forte pode reduzir a qualidade visual das imagens dentro do PDF.',
    ],
    faq: [
      {
        question: 'A compressão sempre atinge o tamanho desejado?',
        answer:
          'Nem sempre. Escaneamentos com muitas imagens comprimem de outro jeito que PDFs de texto. A ferramenta mostra o tamanho alcançado.',
      },
      {
        question: 'O PDF é enviado para comprimir?',
        answer: 'Não. A compressão foi projetada para rodar localmente no navegador.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'Unir PDF' },
      { pathSegment: 'reorder-pdf', label: 'Reordenar páginas' },
      { pathSegment: 'sign-pdf', label: 'Assinar PDF' },
      { pathSegment: 'privacy', label: 'Privacidade' },
    ],
  },
  reorder: {
    title: 'Reordenar páginas de PDF no navegador | Sign X PDF',
    description:
      'Altere a ordem das páginas de um PDF no navegador. A reordenação é local — os arquivos não são enviados aos servidores da Sign X PDF.',
    h1: 'Reordenar páginas de um PDF no navegador',
    answerFirst:
      'Reordene páginas de PDF direto no navegador com a Sign X PDF. O arquivo é processado localmente, sem envio aos servidores da Sign X PDF. Não é preciso conta. Salve o PDF reordenado ao terminar.',
    privacyNote:
      'Seu PDF é processado localmente no navegador e não é enviado aos servidores da Sign X PDF.',
    whatItDoes:
      'Abra um PDF, arraste ou mova as páginas para a ordem desejada e exporte o documento atualizado.',
    howTo: [
      'Carregue um PDF no espaço de trabalho.',
      'Arraste as páginas para a ordem desejada.',
      'Revise a sequência de páginas.',
      'Salve o PDF atualizado.',
    ],
    localProcessing:
      'A reordenação de páginas é aplicada com ferramentas PDF do cliente no navegador, após o carregamento dos recursos.',
    limitations: [
      'Documentos muito grandes podem demorar mais para renderizar miniaturas.',
      'PDFs protegidos por senha podem precisar ser desbloqueados antes.',
    ],
    faq: [
      {
        question: 'Posso reordenar depois de unir arquivos?',
        answer: 'Sim. Una ou adicione páginas primeiro e reorganize antes de salvar.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'Unir PDF' },
      { pathSegment: 'delete-pdf-pages', label: 'Excluir páginas' },
      { pathSegment: 'compress-pdf', label: 'Comprimir PDF' },
      { pathSegment: 'privacy', label: 'Privacidade' },
    ],
  },
  deletePages: {
    title: 'Excluir páginas de PDF localmente no navegador — sem enviar arquivos | Sign X PDF',
    description:
      'Remova páginas indesejadas de um PDF no navegador. A exclusão roda localmente, sem enviar o PDF aos servidores da Sign X PDF.',
    h1: 'Excluir páginas de um PDF no navegador',
    answerFirst:
      'Remova páginas de um PDF no navegador com a Sign X PDF. O processamento fica no seu dispositivo, em vez de enviar o arquivo aos servidores da Sign X PDF. Não é preciso conta. Salve o PDF atualizado ao terminar.',
    privacyNote:
      'Seu PDF é processado localmente no navegador e não é enviado aos servidores da Sign X PDF.',
    whatItDoes:
      'Abra um PDF, selecione as páginas a remover, confira o que sobrou e exporte um arquivo novo sem essas páginas.',
    howTo: [
      'Carregue um PDF no espaço de trabalho.',
      'Selecione as páginas a excluir.',
      'Confirme se as páginas restantes estão corretas.',
      'Salve o PDF atualizado.',
    ],
    localProcessing:
      'A exclusão de páginas é feita com bibliotecas do cliente no navegador, depois que a ferramenta carrega.',
    limitations: [
      'Páginas excluídas não podem ser recuperadas do arquivo exportado.',
      'Alguns PDFs criptografados exigem senha antes de alterar as páginas.',
    ],
    faq: [
      {
        question: 'Posso excluir várias páginas de uma vez?',
        answer:
          'Sim. Selecione várias páginas no gerenciador de páginas e remova-as antes de salvar.',
      },
    ],
    related: [
      { pathSegment: 'reorder-pdf', label: 'Reordenar páginas' },
      { pathSegment: 'merge-pdf', label: 'Unir PDF' },
      { pathSegment: 'compress-pdf', label: 'Comprimir PDF' },
      { pathSegment: 'privacy', label: 'Privacidade' },
    ],
  },
  privacy: {
    title: 'Privacidade — Processamento local de PDF | Sign X PDF',
    description:
      'Como a Sign X PDF processa PDFs no navegador sem enviar o documento para o processamento das ferramentas, como avaliar editores privados e o que não afirmamos.',
    h1: 'Privacidade e processamento local de PDF',
    answerFirst:
      'A Sign X PDF foi construída para que o PDF selecionado seja lido e processado no navegador na assinatura e nas edições comuns. Esse PDF não é enviado aos servidores da Sign X PDF para esse processamento. Os recursos normais do site ainda são baixados pela rede. Não é preciso conta para essas ferramentas no navegador.',
    privacyNote:
      'Seu PDF é processado localmente no navegador e não é enviado aos servidores da Sign X PDF para o processamento das ferramentas.',
    whatItDoes:
      'Esta página explica o modelo de privacidade das ferramentas no navegador da Sign X PDF, como o processamento local difere de sites que pedem upload, e um checklist prático para avaliar qualquer editor de PDF com o qual você confie arquivos confidenciais.',
    howTo: [
      'HTML, JavaScript, fontes e recursos WASM do aplicativo são baixados como em qualquer site.',
      'Você escolhe um PDF com o seletor do navegador ou arrasta e solta (o navegador mantém uma referência local ao arquivo).',
      'O arquivo é lido com APIs do navegador e processado no dispositivo com bibliotecas do cliente e, quando usado, WebAssembly.',
      'Você salva o resultado no dispositivo; o fluxo não foi feito para guardar uma cópia do PDF no servidor.',
    ],
    localProcessing:
      'Processamento local significa que a edição roda na aba do navegador com código do cliente (incluindo renderização no estilo pdf.js, montagem com pdf-lib e QPDF WebAssembly em algumas operações). Não significa “sem rede de jeito nenhum”: scripts e outros recursos ainda carregam, e anúncios ou analytics de terceiros podem solicitar recursos web comuns se estiverem na página. Os bytes do documento no fluxo da ferramenta devem permanecer na aba, e não ser enviados por POST aos servidores de aplicação da Sign X PDF.',
        storageDisclosure: {
      heading: "Armazenamento do navegador usado pelo Sign X PDF",
      storageColumn: "Armazenamento",
      purposeColumn: "Finalidade",
      rows: [
        {
          storage: "localStorage",
          purpose:
            "Preferência de idioma e uma janela curta de limite de exportações gratuitas. São dados de primeira parte do site, não cookies de publicidade.",
        },
        {
          storage: "IndexedDB",
          purpose:
            "Assinaturas salvas que você escolhe manter neste navegador (incluindo blobs de imagem) para reutilização.",
        },
        {
          storage: "Cookies",
          purpose:
            "O processamento principal de PDF não exige cookies publicitários de primeira parte. Anúncios ou analytics de terceiros, se presentes, podem definir cookies sob suas políticas.",
        },
      ],
      clearNote:
        "Limpar os dados deste site no navegador remove preferências e assinaturas salvas localmente. O fluxo da ferramenta não mantém uma cópia do PDF no servidor.",
    },
limitations: [
      'O processamento local não protege um dispositivo comprometido nem extensões maliciosas do navegador.',
      'Não afirmamos privacidade de nível militar, anonimato total, telemetria zero em todo ambiente de navegador nem risco zero.',
      'Os recursos comuns do site sempre são baixados; o uso offline não é garantido até você verificar um carregamento em cache no seu dispositivo.',
      'Se no futuro algum recurso exigir envio pela rede, seria necessária uma mudança de design explícita e texto atualizado.',
    ],
    faq: [
      {
        question: 'Algum dado sai do meu dispositivo?',
        answer:
          'Os recursos do site são baixados normalmente. O PDF selecionado deve permanecer no navegador durante o processamento. Não afirmamos que nenhum byte saia do dispositivo em qualquer circunstância (por exemplo, comportamento do sistema ou de extensões fora do app).',
      },
      {
        question: 'Vocês armazenam meu PDF em um servidor?',
        answer:
          'As ferramentas no navegador descritas aqui não foram projetadas para enviar seu PDF aos servidores da Sign X PDF para armazenamento ou conversão.',
      },
      {
        question: "Que armazenamento do navegador o Sign X PDF usa?",
        answer:
          "localStorage guarda preferência de idioma e uma janela de limite de exportação. IndexedDB guarda assinaturas que você mantém. O processamento principal de PDF não exige cookies publicitários de primeira parte. Limpe os dados do site para remover esses itens locais.",
      },
      {
        question: 'Preciso de uma conta?',
        answer:
          'Não é necessário ter conta para usar as ferramentas de assinatura e PDF no navegador descritas neste site.',
      },
      {
        question: 'Como avaliar se um editor de PDF online é seguro?',
        answer:
          'Prefira um modelo de processamento claro (upload versus local), política de retenção, exigência de conta, divulgação de telemetria, se as assinaturas são marcas visíveis ou com certificado, componentes de código aberto que você possa inspecionar e limites práticos de arquivo. Verifique as afirmações com as ferramentas de rede do navegador usando um arquivo de teste com nome único.',
      },
      {
        question: 'A Sign X PDF é automaticamente a opção mais segura?',
        answer:
          'Nenhuma ferramenta é automaticamente a mais segura para todo modelo de ameaça. A Sign X PDF busca processamento local do documento e limites transparentes. Compare critérios — não slogans — e confira de novo o comportamento de rede no seu caso de uso.',
      },
      {
        question: 'Posso inspecionar os componentes de código aberto?',
        answer:
          'Sim. Os avisos de licença do QPDF, pdf-lib e outras bibliotecas estão na página de licenças de código aberto.',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: 'Assinar PDF' },
      { pathSegment: 'merge-pdf', label: 'Unir PDF' },
      { pathSegment: 'compress-pdf', label: 'Comprimir PDF' },
      { pathSegment: 'open-source-licences', label: 'Licenças de código aberto' },
      { pathSegment: '', label: 'Todas as ferramentas' },
    ],
  },
});
