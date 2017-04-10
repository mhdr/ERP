package com.nasimeshomal.config;

import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@EnableWebMvc
public class WebConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        registry.addResourceHandler("/hbs/**")
                .addResourceLocations("classpath:/static/hbs/")
                .setCachePeriod(3600*24*7);

        registry.addResourceHandler("/javascripts/**")
                .addResourceLocations("classpath:/static/javascripts/")
                .setCachePeriod(3600*24*7);

        registry.addResourceHandler("/stylesheets/**")
                .addResourceLocations("classpath:/static/stylesheets/")
                .setCachePeriod(3600*24*7);

        registry.addResourceHandler("/fonts/**")
                .addResourceLocations("classpath:/static/fonts/")
                .setCachePeriod(3600*24*7);
    }
}