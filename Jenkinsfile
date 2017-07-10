
node("launchpad-maven") {
  checkout scm
  stage("Build") {
    sh "npm run start"
  }
  stage("Deploy")
}
