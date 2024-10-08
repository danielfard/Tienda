/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}', // Asegúrate de incluir las rutas correctas
  ],
  theme: {
    extend: {
			fontFamily: {
				workSans: ['Work Sans']
			},
			colors: {
				primary: {
					900: '#353BBF',
					800: '#335EDF',
					700: '#3170F2',
					600: '#2B84FF',
					500: '#2093FF',
					400: '#3BA3FF',
					300: '#5FB4FF',
					200: '#8FCAFF',
					100: '#BCDEFF',
					50: '#E3F2FF'
				},
				auxiliar: {
					900: '#006F2B',
					800: '#008F41',
					700: '#00A14D',
					600: '#00B45B',
					500: '#00C466',
					400: '#00CF7C',
					300: '#00D994',
					200: '#7AE4B4',
					100: '#B3EFD1',
					50: '#E0F9ED'
				},
				error: {
					900: '#BC2522',
					800: '#CB302E',
					700: '#D93635',
					600: '#EB403C',
					500: '#F9493C',
					400: '#F45956',
					300: '#E97878',
					200: '#F29D9E',
					100: '#FFCFD4',
					50: '#FFECEF'
				},
				warning: {
					900: '#FE730E',
					800: '#FE9213',
					700: '#FEA215',
					600: '#FFB518',
					500: '#FFC31D',
					400: '#FFCC32',
					300: '#FFD655',
					200: '#FFE185',
					100: '#FFEDB5',
					50: '#FFF8E2',
					0: '#FF9314'
				},
				success: {
					900: '#005A35',
					800: '#007A4A',
					700: '#018B56',
					600: '#0B9D63',
					500: '#14AC6E',
					400: '#47B883',
					300: '#6BC598',
					200: '#97D4B5',
					100: '#C0E5D1',
					50: '#E5F5ED'
				},
				info: {
					900: '#3040A9',
					800: '#3560C9',
					700: '#3771DC',
					600: '#3984F0',
					500: '#3992FF',
					400: '#4DA2FF',
					300: '#69B3FF',
					200: '#93C8FF',
					100: '#BDDDFF',
					50: '#E4F2FF'
				},
				gray: {
					900: '#0F1218',
					800: '#2F3238',
					700: '#4D5056',
					600: '#606369',
					500: '#878A91',
					400: '#A8ABB2',
					300: '#CCD0D7',
					200: '#DFE2EA',
					100: '#EBEEF6',
					50: '#F4F7FF',
					opacity: '#ADB5BD80'
				}
			},
			boxShadow: {
				deep: '0px 6px 14px 0px rgba(33, 34, 36, 0.08)',
				medium: '0px 4px 8px 1px rgba(33, 34, 36, 0.12)',
				soft: '0px 2px 4px 0px rgba(33, 34, 36, 0.12)',
				'focus:': '0px 4px 8px 1px rgba(51, 94, 223, 0.12)'
			}
		},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light"], // Cambia a "light" o a otro tema que prefieras
  },
}
