import type { AnalysisResult, HistoryEntry } from '../types/analysis';

export const IMAGES = {
  hero: "/1fd38367-d16d-4495-9403-02ef14b034ba.jpg",
  lesionOriginal: "/94aac870-f102-4f3d-beb7-cf5f6450624e.jpg",

  lesionHeatmap: "/f27b2fbc-bc91-4669-9ffe-cf2c588d6548.jpg",

  lesionOverlay: "/77304080-7ec1-4f88-b5cd-6174d6240179.jpg",

  lesionAlt: "/17a43e97-ae67-4690-bf36-20b7138b6213.jpg"

};

export const mockResult: AnalysisResult = {
  id: 'an_8241',
  date: '24 Aug 2026',
  imageUrl: IMAGES.lesionOriginal,
  gradcam: {
    original: IMAGES.lesionOriginal,
    heatmap: IMAGES.lesionHeatmap,
    overlay: IMAGES.lesionOverlay
  },
  predictions: [
  { label: 'Melanocytic Nevus', confidence: 87.4 },
  { label: 'Melanoma', confidence: 6.2 },
  { label: 'Benign Keratosis', confidence: 3.1 }],

  riskLevel: 'info',
  condition: {
    name: 'Melanocytic Nevus',
    shortName: 'Common mole',
    plainLanguage:
    'A melanocytic nevus is the medical name for a common mole — a small area where pigment-producing skin cells have grouped together.',
    sections: [
    {
      heading: 'What it means',
      body: 'Most people have between 10 and 40 moles. They form when pigment cells cluster together instead of spreading evenly through the skin. The large majority stay the same for years and need no treatment at all.'
    },
    {
      heading: 'Common characteristics',
      body: 'Usually smaller than a pencil eraser, round or oval, one even colour, with a smooth clearly defined edge. They can be flat or slightly raised, and range from tan to dark brown.'
    },
    {
      heading: 'What to watch for',
      body: 'Change matters more than appearance at any single moment. Take note if a spot grows quickly, develops more than one colour, becomes uneven at the edges, itches persistently, or bleeds.'
    },
    {
      heading: 'When to seek professional advice',
      body: 'If anything about the spot changes, or if you are simply unsure, a qualified dermatologist can examine it properly. A short in-person check is the only way to confirm what a spot actually is.'
    }]

  }
};

export const historyEntries: HistoryEntry[] = [
{
  id: 'an_8241',
  date: '24 Aug 2026',
  imageUrl: IMAGES.lesionOriginal,
  label: 'Melanocytic Nevus',
  confidence: 87.4,
  riskLevel: 'info',
  region: 'Upper back',
  timestamp: 1787529600000
},
{
  id: 'an_8103',
  date: '12 Jul 2026',
  imageUrl: IMAGES.lesionAlt,
  label: 'Benign Keratosis',
  confidence: 79.1,
  riskLevel: 'info',
  region: 'Left forearm',
  timestamp: 1784851200000
},
{
  id: 'an_7994',
  date: '02 Jun 2026',
  imageUrl: IMAGES.lesionOverlay,
  label: 'Actinic Keratosis',
  confidence: 61.5,
  riskLevel: 'review',
  region: 'Right shoulder',
  timestamp: 1780358400000
},
{
  id: 'an_7810',
  date: '18 Apr 2026',
  imageUrl: IMAGES.lesionOriginal,
  label: 'Melanocytic Nevus',
  confidence: 91.8,
  riskLevel: 'info',
  region: 'Right calf',
  timestamp: 1776470400000
}];


export const trackedTimeline = [
{
  id: 'tr_1',
  month: 'Jun 2026',
  date: '02 Jun 2026',
  imageUrl: IMAGES.lesionAlt,
  label: 'Melanocytic Nevus',
  confidence: 84.2,
  note: 'Baseline photo saved.'
},
{
  id: 'tr_2',
  month: 'Jul 2026',
  date: '12 Jul 2026',
  imageUrl: IMAGES.lesionOverlay,
  label: 'Melanocytic Nevus',
  confidence: 85.9,
  note: 'No visible change in border or colour.'
},
{
  id: 'tr_3',
  month: 'Aug 2026',
  date: '24 Aug 2026',
  imageUrl: IMAGES.lesionOriginal,
  label: 'Melanocytic Nevus',
  confidence: 87.4,
  note: 'Slightly clearer photo, same estimated class.'
}];


export const recommendations = [
{
  icon: 'monitor',
  title: 'Monitor changes',
  body: 'Photograph the same spot every few months in similar light. Change over time is the signal worth noticing.',
  learnMore:
  'Keep the camera at the same distance and use a fixed reference point, like a nearby freckle, so the two photos are genuinely comparable.'
},
{
  icon: 'sun',
  title: 'Sun protection',
  body: 'Use appropriate sun protection and avoid excessive UV exposure, including tanning beds and midday sun.',
  learnMore:
  'Broad-spectrum SPF, shade in the middle of the day, and covering up are all general measures — not treatment for any specific condition.'
},
{
  icon: 'droplet',
  title: 'General skin care',
  body: 'Keep the area clean and unirritated. Avoid picking, scratching or applying untested home remedies.',
  learnMore:
  'Irritating a spot can change how it looks, which makes it harder for both you and a clinician to judge whether it has genuinely changed.'
},
{
  icon: 'stethoscope',
  title: 'Professional evaluation',
  body: 'If you notice concerning changes, consider consulting a qualified dermatologist for an in-person assessment.',
  learnMore:
  'Bring your saved photos with you. A dated series is genuinely useful information for a clinician.'
}] as
const;

export const warningSigns = [
{ title: 'Rapid change', body: 'Growth or a shift in shape over weeks rather than years.' },
{ title: 'Changes in colour', body: 'New shades appearing, or more than one colour in one spot.' },
{ title: 'Irregular borders', body: 'Edges that become uneven, notched or blurred.' },
{ title: 'Bleeding', body: 'Bleeding or crusting without an obvious knock or scratch.' },
{ title: 'Persistent itching', body: 'Itching or tenderness that keeps coming back.' },
{ title: 'Significant change', body: 'Anything that simply looks different from how you remember it.' }];


export const analysisStages = [
'Image uploaded',
'Image quality checked',
'Analyzing visual patterns',
'Generating explanation',
'Preparing insights'];


export const analysisMessages = [
'Examining visual patterns',
'Comparing learned features',
'Preparing model explanation',
'Generating insights'];