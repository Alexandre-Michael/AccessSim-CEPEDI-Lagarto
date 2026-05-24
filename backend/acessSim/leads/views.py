from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Lead
from .serializers import LeadSerializer


class LeadCreateView(APIView):
    """
    POST /api/leads/
    Recebe os dados do formulário do site e salva um novo lead no banco.
    Não requer autenticação (endpoint público).
    """

    def post(self, request):
        serializer = LeadSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "mensagem": "Lead cadastrado com sucesso!",
                    "dados": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            {
                "mensagem": "Erro ao cadastrar lead. Verifique os dados enviados.",
                "erros": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )
