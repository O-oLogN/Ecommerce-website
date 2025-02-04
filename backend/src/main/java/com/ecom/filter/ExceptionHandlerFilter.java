package com.ecom.filter;

//@Component
//public class ExceptionHandlerFilter extends OncePerRequestFilter {
//    @Override
//    public void doFilterInternal(@NotNull HttpServletRequest request, @NotNull HttpServletResponse response, @NotNull FilterChain filterChain) throws ServletException, IOException {
//        try {
//            filterChain.doFilter(request, response);
//        } catch (RuntimeException | ServletException e) {
//            ErrorResponse errorResponse = new ErrorResponse() {
//                @NotNull
//                @Override
//                public HttpStatusCode getStatusCode() {
//                    return HttpStatus.INTERNAL_SERVER_ERROR;
//                }
//
//                @NotNull
//                @Override
//                public ProblemDetail getBody() {
//                    ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.INTERNAL_SERVER_ERROR);
//                    problemDetail.setTitle("Internal Server Error");
//                    problemDetail.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
//
//                    return problemDetail;
//                }
//            };
//
//            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
//            response.getWriter().write(convertObjectToJson(errorResponse));
//        }
//    }
//
//    public String convertObjectToJson(Object object) throws JsonProcessingException {
//        if (object == null) {
//            return null;
//        }
//        ObjectMapper mapper = new ObjectMapper();
//        return mapper.writeValueAsString(object);
//    }
//}