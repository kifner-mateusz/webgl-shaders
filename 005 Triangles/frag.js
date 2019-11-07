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

float triangle(in vec2 _st,in bool _flip){
    float fall = 0.12;
    if(_flip){
        return clamp( (((-_st.y*0.5+fall)+_st.x) * ((-_st.y*0.5+fall)-_st.x)) *2000000.0, 0.0, 1.0);
    }else{
        return clamp( (((_st.y*0.5+fall)+_st.x) * ((_st.y*0.5+fall)-_st.x)) *2000000.0, 0.0, 1.0);
    }

}



void main(void) {
    float ratio = 1.0;
    float res = 64.0;
    vec2 res_ratio = vec2(res*ratio,res);
    vec2 uv = (v_texCoord-0.5)*2.0;
    vec2 uv_grid = (fract(uv*res_ratio)-0.5)/2.0;
    vec2 grid = (floor(uv*res_ratio)+res_ratio)/2.0;
    vec2 uv_grid_varing;
    vec2 grid_varing;
    bool varing = mod(grid.y,1.0)==0.0;
    float dist;
    if(varing){
        uv_grid_varing = (fract(uv*res_ratio)-0.5)/2.0;
        grid_varing = (floor(uv*res_ratio)+res_ratio)/2.0;
    }else{
        uv_grid_varing = vec2((fract(uv.x*res_ratio.x+0.5)-0.5)/2.0,(fract(uv.y*res_ratio.y)-0.5)/2.0);
        grid_varing = vec2((floor(uv.x*res_ratio.x+0.5)+res_ratio.x)/2.0,(floor(uv.y*res_ratio.y)+res_ratio.y)/2.0);
    }

    dist = triangle(uv_grid,true);
    gl_FragColor = vec4(1.0);
    // dist = circle(uv_grid_varing,0.2);
    if(dist>0.01){
        gl_FragColor = texture2D(u_image, vec2(1.0 - grid.x/res_ratio.x,grid_varing.y/res_ratio.y) );
    }else{
        if(uv_grid.x<0.0){
            gl_FragColor = texture2D(u_image, vec2(1.0 - (grid.x)/res_ratio.x,(grid.y+0.25)/res_ratio.y) );
        }else{
            gl_FragColor = texture2D(u_image, vec2((1.0 - (grid.x+0.5)/res_ratio.x),(grid.y+0.25)/res_ratio.y) );
        }

        // gl_FragColor = texture2D(u_image, vec2(1.0 - grid.x/res_ratio.x,grid.y/res_ratio.y) );
    }
    // gl_FragColor = vec4(dist,dist,dist,1.0);
    // gl_FragColor = vec4(uv_grid,0.0,1.0);
    // gl_FragColor= vec4(grid/res_ratio,0.0,1.0);


    gl_FragColor.a = 1.0;
}

`;

// var fragCode = `
// precision mediump float;
// varying vec3 vColor;
// varying vec2 v_texCoord;
// uniform sampler2D u_image;
// uniform float time;
// void main(){
//     gl_FragColor = vec4(v_texCoord,fract(time),1.0);
// }
// `