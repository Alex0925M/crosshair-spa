# Configuração do EmailJS para Formulário de Contato

## Como configurar o envio de emails:

### 1. Criar conta no EmailJS
1. Acesse https://www.emailjs.com/
2. Crie uma conta gratuita
3. Faça login no dashboard

### 2. Configurar Service (Serviço de Email)
1. No dashboard, clique em "Email Services"
2. Clique em "Add New Service"
3. Escolha seu provedor de email (Gmail, Outlook, etc.)
4. Para Gmail:
   - Conecte sua conta do Gmail
   - Autorize o EmailJS
5. Anote o **Service ID** gerado

### 3. Criar Template de Email
1. Clique em "Email Templates"
2. Clique em "Create New Template"
3. Configure o template com estas variáveis:
   ```
   From Name: {{user_name}}
   From Email: {{user_email}}
   To Email: solutionscrosshair@gmail.com (ou seu email de teste)
   Subject: 🎯 Nova mensagem do site Crosshair Solutions
   
   Content (HTML):
   <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
     <!-- Header -->
     <div style="background-color: #000000; padding: 20px; text-align: center;">
       <img 
         src="https://i.imgur.com/YOUR_LOGO_LINK.png" 
         alt="Crosshair Solutions" 
         style="height: 60px; width: auto; margin-bottom: 10px;"
       />
       <p style="color: #ffffff; margin: 5px 0 0 0; font-size: 14px;">
         Nova mensagem recebida do site
       </p>
     </div>
     
     <!-- Content -->
     <div style="padding: 30px 20px; background-color: #f8f9fa;">
       <div style="background-color: #ffffff; border-radius: 10px; padding: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
         <h2 style="color: #333333; margin-top: 0; font-size: 18px; border-bottom: 2px solid #ff6b35; padding-bottom: 10px;">
           📩 Detalhes do Contato
         </h2>
         
         <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
           <tr>
             <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
               <strong style="color: #333333;">👤 Nome:</strong>
             </td>
             <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; color: #666666;">
               {{user_name}}
             </td>
           </tr>
           <tr>
             <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
               <strong style="color: #333333;">📧 Email:</strong>
             </td>
             <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; color: #666666;">
               {{user_email}}
             </td>
           </tr>
           <tr>
             <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
               <strong style="color: #333333;">📱 Telefone:</strong>
             </td>
             <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; color: #666666;">
               {{user_phone}}
             </td>
           </tr>
         </table>
         
         <div style="margin: 25px 0;">
           <h3 style="color: #333333; margin-bottom: 15px; font-size: 16px;">💬 Mensagem:</h3>
           <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #ff6b35;">
             <p style="margin: 0; color: #333333; line-height: 1.6; font-size: 15px;">
               {{message}}
             </p>
           </div>
         </div>
         
         <!-- Call to Action -->
         <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #ff6b35; border-radius: 8px;">
           <p style="color: #ffffff; margin: 0; font-size: 16px; font-weight: bold;">
             ⚡ Responda o mais rápido possível para garantir excelente atendimento!
           </p>
         </div>
       </div>
     </div>
     
     <!-- Footer -->
     <div style="background-color: #000000; padding: 20px; text-align: center;">
       <p style="color: #cccccc; margin: 0; font-size: 12px;">
         © 2025 Crosshair Solutions - Soluções em Manutenção Residencial
       </p>
       <p style="color: #ff6b35; margin: 5px 0 0 0; font-size: 12px;">
         📍 Sacramento, CA | 📞 (573) 692-1343
       </p>
     </div>
   </div>
   ```
4. Anote o **Template ID** gerado

### 💡 IMPORTANTE: Template Customizado para Crosshair
O template acima tem:
- ✅ Logo da empresa no header (ao invés de texto)
- ✅ Design profissional com cores da marca (preto e laranja)
- ✅ Layout responsivo e bem organizado
- ✅ Emojis para melhor visualização
- ✅ Call-to-action para resposta rápida
- ✅ Informações de contato da empresa

**🖼️ Para usar a logo:**
1. **Opção 1 (Recomendada):** Faça upload da logo.png para um serviço como:
   - Imgur (imgur.com) - gratuito
   - Google Drive (com link público)
   - Ou qualquer hosting de imagens

2. **Substitua o link:** Troque `https://i.imgur.com/YOUR_LOGO_LINK.png` pelo link real da sua logo

3. **Opção 2 (Alternativa):** Se não conseguir hospedar a imagem, pode voltar ao texto:
   ```html
   <h1 style="color: #ff6b35; margin: 0; font-size: 24px; font-weight: bold;">
     🎯 CROSSHAIR SOLUTIONS
   </h1>
   ```

**Variáveis necessárias no código:**
- `{{user_name}}` - Nome do cliente
- `{{user_email}}` - Email do cliente  
- `{{user_phone}}` - Telefone do cliente
- `{{message}}` - Mensagem do cliente

### 4. Obter Public Key
1. Vá em "Account" > "General"
2. Copie sua **Public Key**

### 5. Configurar variáveis de ambiente
Edite o arquivo `.env.local` com seus valores reais:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=seu_service_id_aqui
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=seu_template_id_aqui  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_public_key_aqui
```

### 6. Testar
1. Reinicie o servidor: `npm run dev`
2. Acesse o formulário de contato
3. Envie uma mensagem de teste
4. Verifique se o email chegou no destino

## Para usar seu email de teste:
### 🎯 MÉTODO MAIS FÁCIL (Recomendado):

1. **No EmailJS Dashboard:**
   - Vá em "Email Templates"
   - Edite seu template (`template_0d9cq73`)
   - Na seção **"Settings"** ou **"To email"**
   - Troque de: `solutionscrosshair@gmail.com`
   - Para: `SEU_EMAIL_PESSOAL@gmail.com`
   - Salve o template

2. **Teste imediatamente:**
   - Não precisa alterar código
   - Todos os emails irão para seu email pessoal
   - Quando quiser voltar pro email da empresa, só trocar de volta

### 📧 Para testar com email diferente:
- Configure o **template** para enviar para seu email pessoal ao invés do email da Crosshair
- Assim você pode testar se está funcionando antes de colocar o email real da empresa

### 🔄 Para alternar entre emails:
- **Teste:** Configure template para seu email pessoal
- **Produção:** Configure template para `solutionscrosshair@gmail.com`

## Limitações da conta gratuita:
- 200 emails por mês
- Ideal para testes e sites pequenos