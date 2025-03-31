// domain/entities/Post.ts

class Post {
	id: number;
	title: string;
	body?: string;
	userId?: number;
  
	constructor({ id, title, body, userId }: PostModel) {
	  this.id = id;
	  this.title = title;
	  this.body = body;
	  this.userId = userId;
	}
  
	updateTitle(newTitle: string) {
	  this.title = newTitle;
	}
  
	updateBody(newBody: string) {
	  this.body = newBody;
	}
  }
  
  export default Post;
  