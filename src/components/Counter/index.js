import {Component} from 'react'

// import RepoItem from '../RepoItem'

const Token = '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'

class Counter extends Component {
  // let jwtToken = cookies.set('jwt_token', jwtToken, {expires: 30})
  state = {updatedReposList: []}

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    const url =
      'https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)

    const reposList = data.items.map(each => ({
      allowForking: each.allow_forking,
      archiveUrl: each.archive_url,
      cloneUrl: each.clone_url,
      id: each.id,
      htmlUrl: each.html_url,
      owner: {
        avatarUrl: each.owner.avatar_url,
        url: each.owner.url,
      },
    }))
    console.log(reposList)

    this.setState({
      updatedReposList: reposList,
    })
  }

  render() {
    const {updatedReposList} = this.state
    console.log(updatedReposList)
    const {id, htmlUrl} = updatedReposList
    console.log(updatedReposList.htmlUrl)

    return <img src={htmlUrl} alt={id} />
    // <div>
    //   <button type="button" onClick={this.onDecrement}>
    //     -
    //   </button>
    //   <div>0</div>
    //   <button type="button" onClick={this.onIncrement}>
    //     +
    //   </button>
    // </div>
  }
}

export default Counter
