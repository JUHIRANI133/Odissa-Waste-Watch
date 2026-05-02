'use server';

/**
 * @fileOverview This file defines a Genkit flow for extracting data from waste receipt images.
 *
 * - extractWasteReceiptData - A function that handles the waste receipt data extraction process.
 * - WasteReceiptDataExtractionInput - The input type for the extractWasteReceiptData function.
 * - WasteReceiptDataExtractionOutput - The return type for the extractWasteReceiptData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WasteReceiptDataExtractionInputSchema = z.object({
  receiptImage: z
    .string()
    .describe(
      "The waste receipt image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type WasteReceiptDataExtractionInput = z.infer<typeof WasteReceiptDataExtractionInputSchema>;

const WasteReceiptDataExtractionOutputSchema = z.object({
  dateOfCollection: z.string().optional().describe('Date of waste collection (YYYY-MM-DD)'),
  districtName: z.string().optional().describe('Name of the district'),
  blockName: z.string().optional().describe('Name of the block'),
  taggedMrf: z.string().optional().describe('Name of the tagged MRF facility'),
  routeId: z.string().optional().describe('The assigned route or circuit ID'),
  driverName: z.string().optional().describe('Name of the driver'),
  phoneNo: z.string().optional().describe('Contact number of the driver or official'),
  gpWeights: z.record(z.string(), z.string()).optional().describe('Breakdown of weights collected from each GP'),
  totalWaste: z.string().optional().describe('Total weight of waste collected in Kg'),
  plastic: z.string().optional().describe('Weight of plastic waste'),
  paper: z.string().optional().describe('Weight of paper waste'),
  metal: z.string().optional().describe('Weight of metal waste'),
  glass: z.string().optional().describe('Weight of glass waste'),
  sanitation: z.string().optional().describe('Weight of sanitation waste'),
  others: z.string().optional().describe('Weight of other categories of waste'),
});
export type WasteReceiptDataExtractionOutput = z.infer<typeof WasteReceiptDataExtractionOutputSchema>;

export async function extractWasteReceiptData(input: WasteReceiptDataExtractionInput): Promise<WasteReceiptDataExtractionOutput> {
  return extractWasteReceiptDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'wasteReceiptDataExtractionPrompt',
  input: {schema: WasteReceiptDataExtractionInputSchema},
  output: {schema: WasteReceiptDataExtractionOutputSchema},
  prompt: `You are an expert data extraction specialist for the Government of Odisha SWM Portal.
  
You will receive an image of a waste receipt. Your task is to extract every relevant piece of information into the requested JSON format.

FIELDS TO EXTRACT:
- Collection Date
- Administrative context: District, Block, MRF (Dropping Point), Route ID.
- Personnel: Driver name and Phone number.
- Weights: 
  1. Total weight collected.
  2. Breakdown of weights per specific Gram Panchayat (GP) mentioned.
  3. Stream breakdown: Plastic, Paper, Metal, Glass, Sanitation, and Others.

NOTE: If a field is mentioned in grams but the schema expects Kg, convert it (e.g., 500gm = 0.5kg) unless it is specifically the GP plastic field.

Waste Receipt Image: {{media url=receiptImage}}`,
});

const extractWasteReceiptDataFlow = ai.defineFlow(
  {
    name: 'extractWasteReceiptDataFlow',
    inputSchema: WasteReceiptDataExtractionInputSchema,
    outputSchema: WasteReceiptDataExtractionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
