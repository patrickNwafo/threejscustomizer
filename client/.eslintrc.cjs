module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/no-unknown-property': ['error', { ignore: ['geometry', 'material', 'material-roughness', 'castShadow', 'receiveShadow', 'dispose', 'intensity', 'position', 'rotation', 'scale', 'args', 'ref', 'object', 'map', 'mapAnisotropy', 'depthTest', 'depthWrite', 'temporal', 'frames', 'alphaTest', 'ambient', 'amount', 'radius', 'preset', 'transparent', 'visible', 'wireframe', 'side', 'color', 'roughness', 'metalness', 'emissive', 'attach', 'shadows', 'gl', 'camera', 'onPointerOver', 'onPointerOut', 'onClick', 'frustumCulled'] }],
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'off',
  },
}
