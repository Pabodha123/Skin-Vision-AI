export const trustPoints = [
{
  icon: 'scan',
  title: 'AI-Powered',
  body: 'Deep learning image analysis.'
},
{
  icon: 'eye',
  title: 'Explainable AI',
  body: 'Understand model attention.'
},
{
  icon: 'lock',
  title: 'Privacy Focused',
  body: 'Your analysis stays protected.'
},
{
  icon: 'book',
  title: 'Educational',
  body: 'Not a medical diagnosis.'
}];


export const howItWorks = [
{
  step: '01',
  title: 'Upload',
  body: 'Upload a clear skin image.',
  icon: 'upload'
},
{
  step: '02',
  title: 'Analyze',
  body: 'Our AI examines visual patterns.',
  icon: 'cpu'
},
{
  step: '03',
  title: 'Understand',
  body: 'See the prediction and Grad-CAM explanation.',
  icon: 'eye'
},
{
  step: '04',
  title: 'Take the Next Step',
  body: 'Explore general information and appropriate guidance.',
  icon: 'gauge'
}];


export const aiCapabilities = [
{
  title: 'Deep Learning',
  body: 'A convolutional backbone learns lesion texture, pigment and border patterns.'
},
{
  title: 'Transfer Learning',
  body: 'Pretrained ImageNet weights are fine-tuned on dermatological imagery.'
},
{
  title: 'Computer Vision',
  body: 'Preprocessing normalises lighting, scale and framing before inference.'
},
{
  title: 'Grad-CAM Explainability',
  body: 'Gradient-weighted maps reveal which regions drove the prediction.'
}];


export const modelMetrics = [
{ label: 'Precision (macro)', value: '0.86' },
{ label: 'Recall (macro)', value: '0.83' },
{ label: 'F1 score (macro)', value: '0.84' },
{ label: 'Top-1 accuracy', value: '0.89' }];


export const datasetClasses = [
{ code: 'nv', name: 'Melanocytic nevi', count: 6705 },
{ code: 'mel', name: 'Melanoma', count: 1113 },
{ code: 'bkl', name: 'Benign keratosis', count: 1099 },
{ code: 'bcc', name: 'Basal cell carcinoma', count: 514 },
{ code: 'akiec', name: 'Actinic keratosis', count: 327 },
{ code: 'vasc', name: 'Vascular lesions', count: 142 },
{ code: 'df', name: 'Dermatofibroma', count: 115 }];


export const faqs = [
{
  q: 'Is this a medical diagnosis?',
  a: 'No. SkinVision AI produces an estimated class and a model confidence score. It is an educational demonstration of computer vision and is not a diagnostic device. Only a qualified clinician can diagnose a skin condition.'
},
{
  q: 'What does the confidence score mean?',
  a: 'It is the probability the model assigns to that class relative to the others it knows. A high score means the image resembles that class in the training data — it does not mean the answer is correct.'
},
{
  q: 'What happens to my image?',
  a: 'In this prototype the image stays in your browser session for the analysis you requested. Nothing is published, shared or used for advertising.'
},
{
  q: 'Which conditions can the model recognise?',
  a: 'Seven lesion categories from the HAM10000 dataset. Anything outside those categories will still be forced into one of them, which is one reason confidence should be read carefully.'
},
{
  q: 'How should I use the Grad-CAM map?',
  a: 'As a sanity check. If the highlighted region sits on the lesion, the model is at least looking in the right place. If it highlights background skin or a hair, treat the prediction with scepticism.'
}];


export const pipeline = [
{ title: 'Input image', body: 'JPG or PNG, up to 10 MB' },
{ title: 'Quality check', body: 'Resolution, exposure, focus and framing' },
{ title: 'Preprocess', body: 'Resize to 224×224, normalise, centre crop' },
{ title: 'EfficientNet-B0', body: 'Fine-tuned convolutional backbone' },
{ title: 'Grad-CAM', body: 'Attention map from the final conv block' }];


export const footerLinks = [
{ label: 'About', to: '/about-ai' },
{ label: 'How It Works', to: '/#how-it-works' },
{ label: 'AI Technology', to: '/#ai-technology' },
{ label: 'Privacy', to: '/profile' },
{ label: 'Terms', to: '/profile' },
{ label: 'Disclaimer', to: '/profile' },
{ label: 'Contact', to: '/profile' }];


export interface ConditionKnowledgeEntry {
  code: string;
  emoji: string;
  color: string;
  name: string;
  subtitle: string;
  description: string;
  whatToKnow?: string[];
  note?: string;
}

export const conditionKnowledge: ConditionKnowledgeEntry[] = [
{
  code: 'nv',
  emoji: '🟢',
  color: '#2f855a',
  name: 'Melanocytic Nevus',
  subtitle: 'Commonly known as a mole',
  description:
  'Melanocytic nevi are common benign growths made up of melanocytes, the cells responsible for producing pigment. They can appear in many different forms and may vary in color, shape and structure.',
  whatToKnow: ['Usually benign', 'Can vary in appearance', 'Changes over time are worth monitoring']
},
{
  code: 'mel',
  emoji: '🔴',
  color: '#b4553f',
  name: 'Melanoma',
  subtitle: 'A potentially serious skin cancer',
  description:
  'Melanoma develops from pigment-producing cells and can sometimes spread to other parts of the body. Finding suspicious changes early is important, although visual appearance alone cannot confirm melanoma.',
  whatToKnow: [
  'Changes in size',
  'Changes in shape',
  'Irregular borders',
  'Multiple or changing colors',
  'A spot that is changing over time'],

  note:
  'A suspicious lesion should be evaluated by a qualified healthcare professional. A definitive skin-cancer diagnosis requires appropriate clinical assessment and, when indicated, biopsy.'
},
{
  code: 'bkl',
  emoji: '🟤',
  color: '#93703a',
  name: 'Benign Keratosis',
  subtitle: 'Common non-cancerous keratotic lesions',
  description:
  'This category includes several benign lesions such as seborrhoeic keratoses and related keratosis-like lesions. Some can have visual characteristics that overlap with more concerning lesions, which is one reason image-based classification can be challenging.'
},
{
  code: 'bcc',
  emoji: '🟠',
  color: '#c9762f',
  name: 'Basal Cell Carcinoma',
  subtitle: 'A common type of skin cancer',
  description:
  'Basal cell carcinoma is a common skin cancer. It generally grows slowly and rarely spreads to distant parts of the body, but untreated lesions can grow destructively into surrounding tissue.',
  note: 'An AI prediction should never be treated as confirmation of cancer. Concerning lesions should be assessed by a healthcare professional.'
},
{
  code: 'akiec',
  emoji: '🟡',
  color: '#b08b4f',
  name: 'Actinic Keratosis',
  subtitle: 'A sun-related precancerous skin growth',
  description:
  'Actinic keratosis, also called solar keratosis, develops after cumulative UV-related skin damage. It commonly appears as a rough or scaly spot on sun-exposed areas such as the face, ears, scalp, neck or hands. Some actinic keratoses can progress to squamous cell carcinoma.',
  note: 'Long-term sun protection is important, and suspicious or persistent lesions should be evaluated professionally.'
},
{
  code: 'vasc',
  emoji: '🔵',
  color: '#3182ce',
  name: 'Vascular Lesion',
  subtitle: 'Lesions associated with blood vessels',
  description:
  'Vascular lesions can appear red, purple or blue because their appearance is related to blood vessels or blood within the skin. Examples include haemangiomas and other vascular changes.'
},
{
  code: 'df',
  emoji: '🟣',
  color: '#805ad5',
  name: 'Dermatofibroma',
  subtitle: 'Usually a benign skin growth',
  description:
  'Dermatofibroma is a common benign skin lesion. It is generally firm and can appear as a small, darker or skin-colored bump. Dermatoscopically, one common pattern includes a peripheral network with a central lighter area.'
}];


export const FULL_DISCLAIMER =
'SkinVision AI is an educational AI project and is not intended to diagnose, treat, cure, or prevent any disease. AI predictions may be inaccurate. Consult a qualified healthcare professional for medical advice.';