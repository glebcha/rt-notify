<% if(logo) { %><img width="300px" src="<%= logo %>" /><%= '\n\n' %><% } %># <%= title %> <% if(version && version.name) { %><% if(version.name){%> v<%= version.name %><% } %> <% } %>

<% if(intro) { %><%= '\n' %>##### _<%= intro %>_<%= '\n' %><% } %>
<% \_.forEach(sections, function(section){
if(section.commitsCount > 0) { %>

## <%= section.title %>

<% _.forEach(section.commits, function(commit){ %> - <%= printCommit(commit, true) %><% }) %>
<% _.forEach(section.components, function(component){ %> - **<%= component.name %>**
<% \_.forEach(component.commits, function(commit){ %> - <%= printCommit(commit, true) %><% }) %>
<% }) %>
<% } %>
<% }) %>
