// fragment shader source code
var fragCode = `precision mediump float;
varying vec3 vColor;
varying vec2 v_texCoord;
uniform sampler2D u_image;
float circle(in vec2 _st, in float _radius){
    vec2 dist = _st;
	return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(dist,dist)*4.0);
}


void main(void) {
    float ratio = 1920.0/1080.0;
    float res = 30.0;
    vec2 res_ratio = vec2(res*ratio,res);
    vec2 uv = (v_texCoord-0.5)*2.0;
    vec2 uv_grid = (fract(uv*res_ratio)-0.5)/2.0;
    vec2 grid = (floor(uv*res_ratio)+res_ratio)/2.0;
    // float index = res*grid.y+grid.x;
    float dist = circle(uv_grid,0.2);
    // gl_FragColor = vec4(grid/res,0.0,1.0);
    if(dist>0.01){
        gl_FragColor = texture2D(u_image, vec2(1.0 - grid.x/res_ratio.x,grid.y/res_ratio.y) );
    }else{
        gl_FragColor = vec4(1.0);
    }
    // gl_FragColor= vec4(grid/res,0.0,1.0);
    gl_FragColor.a =1.0;
}

`;
