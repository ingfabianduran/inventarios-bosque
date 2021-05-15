<template>
  <div id="notfound">
    <div v-if="error.statusCode === 404">
      <div class="notfound">
        <div class="notfound-404">
          <h1>404</h1>
        </div>
        <h2>We are sorry, Page not found!</h2>
        <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
        <a href="/inventarios/equipos">Back To Homepage</a>
		  </div>
    </div>
    <div v-else-if="error.statusCode === 500">
      <div class="notfound">
        <div class="notfound-404">
          <h1>500</h1>
        </div>
        <h2>Internal server error</h2>
        <p>Please contact your administrator</p>
        <a href="/inventarios/equipos">Back To Homepage</a>
		  </div>
    </div>
    <div v-else-if="error.statusCode === 503">
      <div class="notfound">
        <div class="notfound-404">
          <h1>503</h1>
        </div>
        <h2>The server is currently unavailable</h2>
        <p>Because it is overloaded or down for maintenance</p>
        <a href="/inventarios/equipos">Back To Homepage</a>
		  </div>
    </div>
	</div>
</template>
<script>
  /**
    * @module layout/error
  */
  /**
   * @vue-prop {Object} error - Controla todos los posibles errores que se puedan generar en el servidor.
   */
  export default {
    props: {
      error: {
        type: Object,
        required: true
      }
    },
  }
</script>
<style>
  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  body {
    padding: 0;
    margin: 0;
  }

  #notfound {
    position: relative;
  }

  #notfound .notfound {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .notfound {
    max-width: 920px;
    width: 100%;
    line-height: 1.4;
    text-align: center;
    padding-left: 15px;
    padding-right: 15px;
  }

  .notfound .notfound-404 {
    position: absolute;
    height: 100px;
    top: 0;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    z-index: -1;
  }

  .notfound .notfound-404 h1 {
    font-family: 'Open Sans Condensed', sans-serif;
    color: #E0E0E0;
    font-weight: 900;
    font-size: 276px;
    margin: 0px;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .notfound h2 {
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 46px;
    color: #000;
    font-weight: 900;
    text-transform: uppercase;
    margin: 0px;
  }

  .notfound p {
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 16px;
    color: #000;
    font-weight: 400;
    text-transform: uppercase;
    margin-top: 15px;
  }

  .notfound a {
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 14px;
    text-decoration: none;
    text-transform: uppercase;
    background: #F27830;
    display: inline-block;
    padding: 16px 38px;
    border: 2px solid transparent;
    border-radius: 40px;
    color: #fff;
    font-weight: 400;
    -webkit-transition: 0.2s all;
    transition: 0.2s all;
  }

  .notfound a:hover {
    background-color: #fff;
    border-color: #F27830;
    color: #F27830;
  }

  @media only screen and (max-width: 480px) {
    .notfound .notfound-404 h1 {
      font-size: 162px;
    }
    .notfound h2 {
      font-size: 26px;
    }
  }
</style>
