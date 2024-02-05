// This should be imported in the beginning of the app and called before everything else

function boot() {
  this.chrome = this.chrome | this.browser
}

export default boot
