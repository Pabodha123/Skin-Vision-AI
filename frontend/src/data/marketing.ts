export const trustPoints = [
{
  icon: 'scan',
  title: 'Built with computer vision',
  body: 'A convolutional model trained on dermatoscopic lesion imagery.'
},
{
  icon: 'eye',
  title: 'Explainable AI',
  body: 'Every prediction ships with a Grad-CAM attention map.'
},
{
  icon: 'lock',
  title: 'Privacy-conscious design',
  body: 'Images are used for the analysis you requested — nothing else.'
},
{
  icon: 'book',
  title: 'Educational & research focused',
  body: 'A learning tool, never a substitute for clinical judgement.'
}];


export const howItWorks = [
{
  step: '01',
  title: 'Upload',
  body: 'Add a clear image of the skin lesion from your camera or library.',
  icon: 'upload'
},
{
  step: '02',
  title: 'Quality check',
  body: 'We check focus, lighting and framing before the model runs.',
  icon: 'gauge'
},
{
  step: '03',
  title: 'Analyze',
  body: 'A deep-learning model reads the visual patterns in the image.',
  icon: 'cpu'
},
{
  step: '04',
  title: 'Understand',
  body: 'See the prediction, its confidence, and what drove it.',
  icon: 'eye'
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


export const FULL_DISCLAIMER =
'SkinVision AI is an educational AI project and is not intended to diagnose, treat, cure, or prevent any disease. AI predictions may be inaccurate. Consult a qualified healthcare professional for medical advice.';