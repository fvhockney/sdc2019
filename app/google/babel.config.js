module.exports = api => {
	const presets = [
		[
			'@babel/preset-env',
			{
				modules:     'auto',
				targets: { node: 'current', },
				useBuiltIns: 'usage',
				corejs: 3,
			},
		],
	]

	const plugins = [
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-transform-async-to-generator',
		[
			'@babel/plugin-transform-runtime',
			{
				corejs: 3,
			},
		],
		
	]

	const stripConsole = [ 'transform-remove-console', { exclude: [ 'warn', 'error' ]} ]

	if ( api.env( 'prod' ) || api.env( 'production' ) ) {
		plugins.push( stripConsole )
	}

	return {
		presets,
		plugins,
	}
}
