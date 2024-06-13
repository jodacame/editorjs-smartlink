export default {
  basic: '<a href="{{url}}" rel="noopener noreferrer" target="_blank">{{title}}</a>',

  default: `<div><strong>Template not found</strong>
    <a href="https://github.com/jodacame/editorjs-smartlink">Check the documentation</a>
    </div>`,

  embed: `<div class='smart-link-embed'>
                <iframe src="{{embed.url}}" width="100%" height="400" frameborder="0" allowfullscreen></iframe>
                <div class='caption'>
                {{embed.caption}}
                </div>
            </div>`,

  audio: `<div class='smart-link-audio'>
                <audio controls>
                    <source src="{{audio.url}}" type="audio/*">
                      Your browser does not support the audio element.
                  </audio>
                </div>`,

  link: `<a class='smart-link-preview' href="{{meta.url}}" target="_blank" rel="noopener noreferre nofollow">
                  <div class='info'>
                    <h2 class='title'>{{meta.title}}</h2>
                    <p class='description'>{{meta.description}}</p>
                    <span class='url'>{{meta.hostname}}</span>
                  </div>
                  {{#if meta.image.url}}
                    <div class='image'>
                      <img src="{{meta.image.url}}" alt="{{meta.title}}">
                    </div>
                  {{/if}}
                </a>`,

  movie: `<div class="movie">
                <div class="overlay"  style="background-image:url('https://image.tmdb.org/t/p/w500{{movie.backdrop_path}}')"></div>
                <div class="poster">
                  <img src="https://image.tmdb.org/t/p/w500{{movie.poster_path}}" alt="{{movie.title}}">
                </div>
                <div class="info">
                  
                  <h2 class="title">{{movie.original_title}}</h2> 
                  <div class="subheader">
                    <span class="year">{{movie.release_date}}</span><span class="divider"></span>
                    <ul class="genres">
                    {{#each movie.genres}}
                      <li>{{this.name}}</li>
                    {{/each}}
                    </ul>
                  </div>
                  <p class="description">{{movie.overview}}</p>
                </div>
                </div>
          `,
};
