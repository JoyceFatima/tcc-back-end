import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { config } from '@/config';

@Injectable()
export class GeminiService {
  private readonly apiKey = config.gemini.apiKey;
  private readonly apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`;

  async generateDashboardData(businessInfo: any): Promise<any> {
    const prompt = `
      Analise as informações do negócio a seguir e gere um JSON com os dados para um dashboard de análise de localização.

      **Informações do Negócio:**
      - **Nome:** ${businessInfo.name}
      - **Tipo:** ${businessInfo.businessType.name}
      - **Endereço:** ${businessInfo.address}
      - **Público-Alvo:** ${businessInfo.targetAudience.name}
      - **Orçamento Mensal (Marketing):** R$ ${businessInfo.budget}

      **Formato do JSON de Saída (obrigatório):**
      O JSON de saída deve seguir exatamente a estrutura abaixo, sem nenhuma formatação adicional ou markdown.

      \`\`\`json
      {
        "stats": {
          "locationScore": <number>,
          "locationScoreChange": <number>,
          "dailyFootfall": <number>,
          "targetAudienceCompatibility": <number>,
          "competitors": <number>
        },
        "locationAnalysis": {
          "overallScore": <number>,
          "analysisItems": [
            { "label": "Fluxo de Pessoas", "score": <number> },
            { "label": "Público-Alvo Compatível", "score": <number> },
            { "label": "Concorrência", "score": <number> },
            { "label": "Acessibilidade", "score": <number> },
            { "label": "Estacionamento", "score": <number> },
            { "label": "Transporte Público", "score": <number> },
            { "label": "Segurança", "score": <number> },
            { "label": "Visibilidade", "score": <number> }
          ]
        },
        "insights": [
          {
            "type": "positive",
            "title": "<string>",
            "description": "<string>"
          },
          {
            "type": "warning",
            "title": "<string>",
            "description": "<string>"
          },
          {
            "type": "negative",
            "title": "<string>",
            "description": "<string>"
          }
        ]
      }
      \`\`\`

      **Instruções para Geração dos Dados:**
      - **locationScore**: Um score de 0 a 100 para a localização.
      - **locationScoreChange**: A variação percentual (positiva ou negativa) em relação ao mês anterior.
      - **dailyFootfall**: Uma estimativa do fluxo diário de pessoas na região.
      - **targetAudienceCompatibility**: A porcentagem de compatibilidade do público-alvo com a região.
      - **competitors**: O número de concorrentes diretos em um raio de 500m.
      - **locationAnalysis.overallScore**: A média dos scores dos analysisItems.
      - **locationAnalysis.analysisItems**: Scores de 0 a 100 para cada item.
      - **insights**: Gere um insight positivo, um de aviso e um negativo, com títulos e descrições concisas.
    `;

    try {
      const response = await axios.post(this.apiUrl, {
        contents: [{ parts: [{ text: prompt }] }],
      });

      const jsonString = response.data.candidates[0].content.parts[0].text
        .replace(/```json|```/g, '')
        .trim();
      const generatedData = JSON.parse(jsonString);

      return generatedData;
    } catch (error) {
      console.error(
        'Error calling Gemini API:',
        error.response?.data || error.message,
      );
      throw new Error('Failed to generate dashboard data from Gemini API.');
    }
  }
}
